"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const deleteReviewAction = async (
  reviewId: string,
  gearItemId: string,
) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const url = `${process.env.BACKEND_API_URL}/api/reviews/${reviewId}`;

    console.log("🗑️  DELETE REVIEW REQUEST:");
    console.log("  URL:", url);
    console.log("  Review ID:", reviewId);
    console.log("  Gear ID:", gearItemId);
    console.log("  Token exists:", !!token);

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
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
          "Review delete endpoint not found. Please contact support or try again later.",
        statusCode: 404,
      };
    }

    // Revalidate the gear details page to remove the deleted review
    if (data?.success) {
      console.log("✅ Revalidating path:", `/gears/${gearItemId}`);
      revalidatePath(`/gears/${gearItemId}`);
    }

    return data;
  } catch (error: any) {
    console.error("❌ DELETE REVIEW ERROR:", error);
    return {
      success: false,
      message: error?.message || "Failed to delete review",
      error: error,
    };
  }
};
