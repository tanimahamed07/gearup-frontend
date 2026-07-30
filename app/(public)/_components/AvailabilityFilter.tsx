"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function AvailabilityFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isAvailable = searchParams.get("availability") === "true";

  const handleSwitchChange = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (checked) {
      params.set("availability", "true");
    } else {
      params.delete("availability");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between pt-2">
      <Label
        htmlFor="available-only"
        className="text-sm font-medium cursor-pointer"
      >
        Available Only
      </Label>
      <Switch
        id="available-only"
        checked={isAvailable}
        onCheckedChange={handleSwitchChange}
      />
    </div>
  );
}