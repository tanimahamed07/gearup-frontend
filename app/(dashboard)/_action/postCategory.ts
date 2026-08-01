"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const postCategory = async (name: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({ name }),
  });

  const data = await res.json();

  if (data?.success) {
    revalidatePath("/admin-dashboard/categories");
  }

  return data;
};
