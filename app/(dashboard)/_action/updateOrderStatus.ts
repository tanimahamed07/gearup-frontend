"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type RentalOrderStatusType =
  | "PLACED"
  | "CONFIRMED"
  | "CANCELLED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED";

export const updateRentalOrderStatus = async (
  orderId: string,
  status: RentalOrderStatusType,
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return {
      success: false,
      message: "Unauthorized access! Token not found.",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals/provider/${orderId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }), // Object payload { status: "CONFIRMED" }
    },
  );

  const data = await res.json();

  if (res.ok) {
    // Revalidate page cache to reflect instant UI change
    revalidatePath("/provider-dashboard/incoming-orders");
  }

  return data;
};
