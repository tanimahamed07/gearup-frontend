"use server";

import { cookies } from "next/headers";

export interface TRentalOrderItem {
  gearItemId: string;
  quantity: number;
}

export interface TRentalOrderPayload {
  startDate: string | Date;
  endDate: string | Date;
  items: TRentalOrderItem[];
}

export const bookOrder = async (payload: TRentalOrderPayload) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return data;
};
