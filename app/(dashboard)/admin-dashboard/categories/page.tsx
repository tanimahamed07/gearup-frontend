import React from "react";
import { Sparkles } from "lucide-react";

import { getCategory } from "@/app/(public)/_action/getCategory";

import { CategoryTable } from "../../_component/CategoryTable";
import { CategoryCreateModal } from "../../_component/CategoryCreateModal";

export interface ICategory {
  id: string;
  name: string;
}

export default async function AdminCategoriesPage() {
  // Fetch categories on server side
  const response = await getCategory();
  const categories: ICategory[] = response?.data || [];

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            Category Management
            <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500/20" />
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Overview and manage all gear categories for GearUp
          </p>
        </div>

        {/* Add Category Dialog Modal UI */}
        <CategoryCreateModal />
      </div>

      {/* Main Categories Table Card */}
      <CategoryTable categories={categories} />
    </div>
  );
}
