"use server";

export const getCategory = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/category`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 },
  });

  const data = await res.json();
  return data;
};
