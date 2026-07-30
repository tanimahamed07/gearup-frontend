"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export default function BrandFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentBrand = searchParams.get("brand") || "";
  const [brandValue, setBrandValue] = useState(currentBrand);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleBrandChange = (value: string) => {
    // Update local state immediately for responsive UI
    setBrandValue(value);

    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Debounce URL update
    timerRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        params.set("brand", value.trim());
      } else {
        params.delete("brand");
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500);
  };

  return (
    <div className="space-y-2">
      <Label
        htmlFor="brand-input"
        className="text-xs font-semibold uppercase text-muted-foreground"
      >
        Brand
      </Label>
      <Input
        id="brand-input"
        type="text"
        placeholder="Enter brand name..."
        value={brandValue}
        onChange={(e) => handleBrandChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
}
