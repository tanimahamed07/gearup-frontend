"use client";

import React, { useState, useEffect } from "react";
import {
  FolderPlus,
  Trash2,
  Layers,
  Plus,
  FolderTree,
  Search,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Actions
import { getCategory } from "@/app/(public)/_action/getCategory";
import { postCategory } from "../../_action/postCategory";

export interface ICategory {
  id: string;
  name: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 1. Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await getCategory();
        setCategories(res?.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // 2. Create Category using Server Action
  const handleCreateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    try {
      setIsSubmitting(true);

      const data = await postCategory(categoryName.trim());

      if (data?.success) {
        toast.success("Category created successfully!");
        setCategoryName("");
        setIsDialogOpen(false);

        // Refresh category list
        const res = await getCategory();
        setCategories(res?.data || []);
      } else {
        toast.error(data?.message || "Failed to create category");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header & Add Category Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <FolderTree className="h-8 w-8 text-primary" /> Category Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Overview and manage all gear categories for GearUp.
          </p>
        </div>

        {/* Add Category Dialog Modal UI */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-sm font-semibold">
              <Plus className="h-4 w-4" /> Add New Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleCreateCategory}>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FolderPlus className="h-5 w-5 text-primary" /> Create
                  Category
                </DialogTitle>
                <DialogDescription>
                  Enter a category name for grouping sports and outdoor gear.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 space-y-2">
                <label className="text-xs font-semibold text-foreground">
                  Category Name <span className="text-destructive">*</span>
                </label>
                <Input
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g. Climbing, Camping, Cycling"
                  required
                />
              </div>

              <DialogFooter>
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  Create Category
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Category Table */}
      <Card className="border border-border/60 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            All Categories ({categories.length})
          </CardTitle>

          {/* Search Input UI */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search category..."
              className="pl-8 text-xs bg-background"
            />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground text-sm gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading categories...
            </div>
          ) : categories.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead>Category Name</TableHead>
                    <TableHead>Category ID</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {categories.map((category) => (
                    <TableRow
                      key={category.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="font-semibold text-foreground text-sm">
                        <Badge
                          variant="secondary"
                          className="font-medium text-xs"
                        >
                          {category.name}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-xs font-mono text-muted-foreground">
                        {category.id}
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          title="Delete Category"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-12 text-center text-muted-foreground text-sm">
              No categories found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
