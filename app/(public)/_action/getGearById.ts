"use server";

export const getGearDetails = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 3600,
      tags: ["gear-details"],
    },
  });

  const data = await res.json();
  return data;
};
