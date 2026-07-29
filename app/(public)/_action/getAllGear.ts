"use server";
// Fetch all gear items via Next.js API route
export const getAllGearItems = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await res.json();
  return data;
};
