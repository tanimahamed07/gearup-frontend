import { getAllGearItems } from "../_action/getAllGear";
import GearCard from "./GearCard";
import { IGearItem } from "@/lib/types/types";
import ClearFiltersButton from "./ClearFiltersButton";

export default async function GearList({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = searchParams ? await searchParams : {};
  console.log("🔎 Search query:", query);

  const gears = await getAllGearItems({ query });
  console.log("📦 Gears received:", gears.data?.length || 0);

  // Handle empty or error states
  if (!gears?.data || gears.data.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed text-center p-6">
        <p className="text-lg font-medium">No gear items found</p>
        <p className="text-sm text-muted-foreground mb-4">
          {query?.searchTerm
            ? `No results for "${query.searchTerm}". Try a different search term.`
            : "No gear items available at the moment."}
        </p>
        {query?.searchTerm && <ClearFiltersButton />}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {gears.data.map((item: IGearItem) => (
        <GearCard key={item.id} item={item} />
      ))}
    </div>
  );
}
