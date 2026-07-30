"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export default function PriceFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || 300);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePriceChange = (values: number[]) => {
    const [min, max] = values;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());


      if (min > 0) params.set("minPrice", min.toString());
      else params.delete("minPrice");

      if (max < 300) params.set("maxPrice", max.toString());
      else params.delete("maxPrice");

      router.replace(`${pathname}?${params.toString()}`);
    }, 400);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-xs font-semibold">
        <Label className="uppercase text-muted-foreground">Price Range</Label>
        <span className="text-primary font-bold">
          ${minPrice} - ${maxPrice}
        </span>
      </div>
      <Slider
        min={0}
        max={300}
        step={5}
        defaultValue={[minPrice, maxPrice]}
        onValueChange={handlePriceChange}
      />
    </div>
  );
}
