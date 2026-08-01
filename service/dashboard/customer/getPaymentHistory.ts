"use server";

import { cookies } from "next/headers";

export const getPaymentHistory = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  // DEVELOPMENT ONLY: Uncomment below line to simulate slow loading for testing
  // await new Promise(resolve => setTimeout(resolve, 2000));

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store", // Disable caching - forces fresh fetch every time
    next: { revalidate: 0 }, // Revalidate immediately
  });

  const result = await res.json();

  return result;
};
