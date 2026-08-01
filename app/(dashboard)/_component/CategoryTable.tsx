"use client";

import React, { useState } from "react";
import { Layers } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CategoryDeleteDialog } from "./CategoryDeleteDialog";
import { CategoryTableRow } from "../admin-dashboard/categories/_components/CategoryTableRow";

interface ICategory {
  id: string;
  name: string;
}

interface CategoryTableProps {
  categories: ICategory[];
}

export function CategoryTable({ categories }: CategoryTableProps) {
  const [categoryToDelete, setCategoryToDelete] = useState<ICategory | null>(
    null,
  );

  return (
    <>
      <Card className="border border-border/60 shadow-sm rounded-xl overflow-hidden bg-card">
        <CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            All Categories ({categories.length})
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {categories.length > 0 ? (
            <div className="overflow-x-auto">
              <Table className="min-w-175">
                <TableHeader className="bg-muted/40">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-75 whitespace-nowrap pl-6">
                      Category Details
                    </TableHead>
                    <TableHead className="w-75 whitespace-nowrap">
                      System ID
                    </TableHead>
                    <TableHead className="text-right whitespace-nowrap pr-6 w-35">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <CategoryTableRow
                      key={category.id}
                      category={category}
                      onDelete={setCategoryToDelete}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 shadow-inner">
                <Layers className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-1">No categories found</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                There are no gear categories created in the platform yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <CategoryDeleteDialog
        category={categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
      />
    </>
  );
}
