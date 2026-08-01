"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
export const updateUserStatus = async (
  userId: string,
  status: "ACTIVE" | "SUSPENDED",
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, message: "Unauthorized access!" };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/admin/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    },
  );

  const data = await res.json();
  if (data?.success) {
    revalidatePath("/provider-dashboard/users");
  }

  return data;
};
