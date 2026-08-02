"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const deleteReviewAction = async (
  reviewId: string,
  gearItemId: string,
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const url = `${process.env.BACKEND_API_URL}/api/reviews/${reviewId}`;

  console.log("🗑️ DELETE REVIEW REQUEST:");
  console.log("URL:", url);
  console.log("Review ID:", reviewId);
  console.log("Gear ID:", gearItemId);
  console.log("Token exists:", !!token);

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  console.log("📊 RESPONSE STATUS:", res.status, res.statusText);
  console.log("📊 RESPONSE OK:", res.ok);

  const data = await res.json();

  console.log("📦 RESPONSE DATA:", data);

  // Revalidate the gear details page to remove the deleted review
  if (data?.success) {
    console.log("✅ Revalidating path:", `/gears/${gearItemId}`);
    revalidatePath(`/gears/${gearItemId}`);
  }

  return data;
};
