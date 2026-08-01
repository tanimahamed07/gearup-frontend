"use server";

import { IGearItem } from "@/lib/types/types";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const updateGearItem = async (id: string, payload: IGearItem) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  // Revalidate the provider gears page to show the updated item
  if (data?.success) {
    revalidatePath("/provider-dashboard/gears");
  }

  return data;
};
