"use server";

export const getCategory = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
  const res = await fetch(`${apiUrl}/api/category`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 },
  });

  const data = await res.json();
  return data;
};
