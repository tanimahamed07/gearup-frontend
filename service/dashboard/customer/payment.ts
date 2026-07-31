"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const createCheckoutSession = async (orderId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ orderId }),
    },
  );

  const data = await res.json();

  if (data?.success || res.ok) {
    revalidateTag("my-orders", {
      expire: 0,
    });
  }

  return data;
};
