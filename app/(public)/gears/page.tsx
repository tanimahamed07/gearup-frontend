import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import GearList from "../_components/GearList";
import SearchBar from "../_components/SearchBar";

// Types based on your Prisma Model
export type GearItem = {
  id: string;
  name: string;
  brand: string;
  description: string;
  image?: string; // Image URL from backend
  pricePerDay: number;
  stock: number;
  isAvailable: boolean;
  providerId: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
};

export default function GearPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Explore Gear</h1>
          <p className="text-muted-foreground">
            Find and rent the best gym and fitness equipment near you.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <SearchBar />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* 🎛️ Sidebar Filter Controls */}

        {/* 📦 Gear Items Grid */}
        <main className="lg:col-span-4">
          <Suspense
            fallback={
              <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            }
          >
            <GearList searchParams={searchParams} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
