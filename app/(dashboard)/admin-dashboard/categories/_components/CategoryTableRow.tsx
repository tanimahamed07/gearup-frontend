"use client";

import React from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { CopyButton } from "@/components/ui/copy-button";

interface ICategory {
  id: string;
  name: string;
}

interface CategoryTableRowProps {
  category: ICategory;
  onDelete: (category: ICategory) => void;
}

export function CategoryTableRow({
  category,
  onDelete,
}: CategoryTableRowProps) {
  return (
    <TableRow className="hover:bg-muted/40 transition-colors">
      {/* Category Name & Icon Avatar */}
      <TableCell className="whitespace-nowrap pl-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-extrabold text-xs shrink-0 uppercase border border-primary/20">
            {category.name?.[0] || "C"}
          </div>
          <div className="space-y-0.5 max-w-55">
            <p className="font-bold text-sm text-foreground line-clamp-1">
              {category.name}
            </p>
            <p className="text-[11px] text-muted-foreground font-mono">
              Active Category
            </p>
          </div>
        </div>
      </TableCell>

      {/* Category ID with Copy Feature */}
      <TableCell className="whitespace-nowrap">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <span>{category.id}</span>
          <CopyButton value={category.id} />
        </div>
      </TableCell>

      {/* Action Button */}
      <TableCell className="text-right whitespace-nowrap pr-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(category)}
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
