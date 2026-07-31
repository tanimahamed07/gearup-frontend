"use client";

import {  MoreVertical, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GearFormDialog } from "./GearFormDialog";
import { ICategory, IGearItem } from "@/lib/types/types";

interface GearActionMenuProps {
  gear: IGearItem;
  categories: ICategory[];
}

export function GearActionMenu({ gear, categories }: GearActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Manage Gear
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Client Component-এর ভেতরে event handler কাজ করবে */}
        <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
          <GearFormDialog
            categories={categories}
            mode="edit"
            gearId={gear.id}
            initialData={{
              name: gear.name,
              brand: gear.brand,
              categoryId: gear.categoryId,
              pricePerDay: Number(gear.pricePerDay),
              stock: gear.stock,
              image: gear.image || "",
              description: gear.description,
            }}
          />
        </DropdownMenuItem>

        <DropdownMenuItem className="text-rose-600 focus:text-rose-600 cursor-pointer">
          <Trash2 className="h-3.5 w-3.5 mr-2" />
          Delete Gear
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
