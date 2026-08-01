"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const deleteCategory = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/category/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  const data = await res.json();

  if (data?.success) {
    revalidatePath("/admin-dashboard/categories");
  }

  return data;
};
