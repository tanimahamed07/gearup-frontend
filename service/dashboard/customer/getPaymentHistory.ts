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

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments`, {
    headers: {
      // Authorization : accessToken as unknown as string,
      // Authorization : `${accessToken}`,
      // Authorization : `Bearer ${accessToken}`

      Cookie: `accessToken=${accessToken}`,
    },
  });

  const result = res.json();

  return result;
};
