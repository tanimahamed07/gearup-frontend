"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export interface CreateReviewPayload {
  gearItemId: string;
  rating: number;
  comment: string;
}

export const createReviewAction = async (payload: CreateReviewPayload) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  // Revalidate the gear details page to show the new review
  if (data?.success) {
    revalidatePath(`/gears/${payload.gearItemId}`);
  }

  return data;
};
