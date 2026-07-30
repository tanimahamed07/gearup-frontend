import { SlidersHorizontal } from "lucide-react";
import { getCategory } from "../_action/getCategory";
import CategoryFilter from "./CategoryFilter";
import BrandFilter from "./BrandFilter";
import PriceFilter from "./PriceFilter";
import AvailabilityFilter from "./AvailabilityFilter";
import ResetFiltersButton from "./ResetFiltersButton";

export default async function SidebarFilter() {
  const result = await getCategory();
  const categories = result?.data || [];

  return (
    <aside className="h-fit rounded-xl border bg-card p-5 shadow-sm">
      {/* Sidebar Header */}
      <div className="mb-4 flex items-center justify-between border-b pb-3">
        <h2 className="flex items-center gap-2 font-semibold">
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </h2>
        {/* ✅ Reset Filter Button */}
        <ResetFiltersButton />
      </div>

      <div className="space-y-6">
        {/* ✅ Category Filter Component */}
        <CategoryFilter categories={categories} />

        {/* ✅ Brand Filter Component */}
        <BrandFilter />

        {/* ✅ Price Range Filter Component */}
        <PriceFilter />

        {/* ✅ Availability Filter Component */}
        <AvailabilityFilter />
      </div>
    </aside>
  );
}
