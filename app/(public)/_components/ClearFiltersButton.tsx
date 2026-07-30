"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ClearFiltersButton() {
  const router = useRouter();

  return (
    <Button variant="outline" onClick={() => router.push("/gears")}>
      Clear Filters
    </Button>
  );
}
