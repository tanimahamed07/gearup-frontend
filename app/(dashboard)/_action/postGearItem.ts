"use server";

import { IGearItem } from "@/lib/types/types";
import { cookies } from "next/headers";


export const postGearItem = async (payload: IGearItem) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear`, {
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
