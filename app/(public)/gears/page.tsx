"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Search, SlidersHorizontal, Loader2, RefreshCw } from "lucide-react";
import GearCard from "../_components/GearCard";
import { getAllGearItems } from "../_action/getAllGear";

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

export default function GearPage() {
  const [gears, setGears] = useState<GearItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [brand, setBrand] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);

  // Fetch Gears Data from API
  const fetchGears = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllGearItems();
      console.log("Fetched data: =======>", data);

      if (data?.success && Array.isArray(data.data)) {
        setGears(data.data);
      } else {
        setError(data?.message || "Failed to load gears");
        setGears([]);
      }
    } catch (err) {
      console.error("Failed to fetch gears:", err);
      setError(
        "Unable to connect to server. Please check if backend is running.",
      );
      setGears([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial Fetch
  useEffect(() => {
    fetchGears();
  }, []);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setBrand("");
    setPriceRange([0, 1000]);
    setOnlyAvailable(false);
  };

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
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search gear, brand, or specs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* 🎛️ Sidebar Filter Controls */}
        <aside className="h-fit rounded-xl border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b pb-3">
            <h2 className="flex items-center gap-2 font-semibold">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="h-8 text-xs text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="mr-1 h-3 w-3" /> Reset
            </Button>
          </div>

          <div className="space-y-6">
            {/* Category Filter */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase text-muted-foreground">
                Category
              </Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="strength">Strength Training</SelectItem>
                  <SelectItem value="weights">Free Weights</SelectItem>
                  <SelectItem value="recovery">Recovery</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase text-muted-foreground">
                Brand
              </Label>
              <Input
                placeholder="e.g. Rogue, Gymshark"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            {/* Price Range Filter */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-semibold">
                <Label className="uppercase text-muted-foreground">
                  Max Price/Day
                </Label>
                <span>${priceRange[1]}</span>
              </div>
              <Slider
                value={[priceRange[1]]}
                min={10}
                max={1000}
                step={10}
                onValueChange={(val) => setPriceRange([priceRange[0], val[0]])}
              />
            </div>

            {/* Availability Filter */}
            <div className="flex items-center justify-between pt-2">
              <Label
                htmlFor="available-only"
                className="text-sm font-medium cursor-pointer"
              >
                Available Only
              </Label>
              <Switch
                id="available-only"
                checked={onlyAvailable}
                onCheckedChange={setOnlyAvailable}
              />
            </div>
          </div>
        </aside>

        {/* 📦 Gear Items Grid */}
        <main className="lg:col-span-3">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-destructive/50 bg-destructive/10 text-center p-6">
              <p className="text-lg font-medium text-destructive mb-2">
                ⚠️ Error Loading Gears
              </p>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Please ensure your backend server is running on{" "}
                  <code className="bg-muted px-2 py-1 rounded">
                    http://localhost:5001
                  </code>
                </p>
                <Button onClick={fetchGears} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" /> Try Again
                </Button>
              </div>
            </div>
          ) : gears.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed text-center p-6">
              <p className="text-lg font-medium">No gear items found</p>
              <p className="text-sm text-muted-foreground mb-4">
                Try adjusting your search or filters.
              </p>
              <Button variant="outline" onClick={handleResetFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gears.map((item) => (
                <GearCard key={item.id} item={item}></GearCard>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
