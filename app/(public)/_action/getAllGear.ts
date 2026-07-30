"use server";

// Fetch all gear items via Next.js API route
export const getAllGearItems = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
} = {}) => {
  try {
    const params = new URLSearchParams();

    if (query && query.searchTerm) {
      params.set("searchTerm", query.searchTerm as string);
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

    if (!res.ok) {
      console.error("❌ Failed to fetch gears:", res.status);
      return { success: false, data: [], message: "Failed to fetch gears" };
    }

    const data = await res.json();
    console.log("✅ Fetched gears:", data.data?.length || 0, "items");
    return data;
  } catch (error) {
    console.error("❌ Error fetching gears:", error);
    return { success: false, data: [], message: "Failed to fetch gears" };
  }
};
