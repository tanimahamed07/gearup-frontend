"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function ResetFiltersButton() {
  const router = useRouter();
  const pathname = usePathname();

  const handleReset = () => {
    // URL-এর সব Query Parameters ক্লিয়ার করে শুধু মেইন পাথে নিয়ে যাবে
    router.replace(pathname);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleReset}
      className="h-8 text-xs text-muted-foreground hover:text-foreground"
    >
      <RefreshCw className="mr-1 h-3 w-3" /> Reset
    </Button>
  );
}
