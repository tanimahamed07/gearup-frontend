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
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const url = `${process.env.BACKEND_API_URL}/api/reviews/${reviewId}`;

  console.log("🔄 UPDATE REVIEW REQUEST:");
  console.log("URL:", url);
  console.log("Review ID:", reviewId);
  console.log("Payload:", payload);
  console.log("Gear ID:", gearItemId);
  console.log("Token exists:", !!token);

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

  const data = await res.json();

  console.log("📦 RESPONSE DATA:", data);

  if (data?.success) {
    // Revalidate the gear details page to show updated review
    revalidatePath(`/gears/${gearItemId}`);
  }

  return data;
};
