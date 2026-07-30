"use server";

export const getGearReview = async (id: string) => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/reviews/gear/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3600,
        tags: ["gear-details"],
      },
    },
  );

  const data = await res.json();
  return data;
};
