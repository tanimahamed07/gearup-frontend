"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export interface UpdateReviewPayload {
  rating: number;
  comment: string;
}

export const updateReviewAction = async (
  reviewId: string,
  payload: UpdateReviewPayload,
  gearItemId: string,
) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const url = `${process.env.BACKEND_API_URL}/api/reviews/${reviewId}`;

    console.log("🔄 UPDATE REVIEW REQUEST:");
    console.log("  URL:", url);
    console.log("  Review ID:", reviewId);
    console.log("  Payload:", payload);
    console.log("  Gear ID:", gearItemId);
    console.log("  Token exists:", !!token);

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(payload),
    });

    console.log("📊 RESPONSE STATUS:", res.status, res.statusText);
    console.log("📊 RESPONSE OK:", res.ok);

    // Check if response is JSON
    const contentType = res.headers.get("content-type");
    console.log("📋 Content-Type:", contentType);

    if (!contentType?.includes("application/json")) {
      const text = await res.text();
      console.error("❌ Non-JSON response:", text);
      return {
        success: false,
        message: "Server returned non-JSON response",
        statusCode: res.status,
      };
    }

    const data = await res.json();
    console.log("📦 RESPONSE DATA:", JSON.stringify(data, null, 2));

    // Handle 404 specifically
    if (res.status === 404) {
      return {
        success: false,
        message:
          "Review update endpoint not found. Please contact support or try again later.",
        statusCode: 404,
      };
    }

    // Revalidate the gear details page to show the updated review
    if (data?.success) {
      console.log("✅ Revalidating path:", `/gears/${gearItemId}`);
      revalidatePath(`/gears/${gearItemId}`);
    }

    return data;
  } catch (error: any) {
    console.error("❌ UPDATE REVIEW ERROR:", error);
    return {
      success: false,
      message: error?.message || "Failed to update review",
      error: error,
    };
  }
};
