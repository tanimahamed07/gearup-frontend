"use server";

// Fetch all gear items via Next.js API route
export const getAllGearItems = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
} = {}) => {
  const params = new URLSearchParams();

  // Add all supported query parameters
  if (query?.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }

  if (query?.category) {
    params.set("category", query.category as string);
  }

  if (query?.minPrice) {
    params.set("minPrice", query.minPrice as string);
  }

  if (query?.maxPrice) {
    params.set("maxPrice", query.maxPrice as string);
  }

  if (query?.availability) {
    params.set("availability", query.availability as string);
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
  const url = `${apiUrl}/api/gear${params.toString() ? `?${params.toString()}` : ""}`;

  console.log("🔍 Fetching gears with URL:", url);

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await res.json();
  return data;
};
