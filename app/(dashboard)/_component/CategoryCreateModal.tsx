"use client";

import React, { useState } from "react";
import { FolderPlus, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { postCategory } from "../_action/postCategory";

export function CategoryCreateModal() {
  const router = useRouter();
  const [categoryName, setCategoryName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    try {
      setIsSubmitting(true);

      const data = await postCategory(categoryName.trim());

      if (data?.success) {
        toast.success("Category created successfully!");
        setCategoryName("");
        setIsDialogOpen(false);
        router.refresh(); // Refresh server component data
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
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-sm font-semibold self-start sm:self-auto">
          <Plus className="h-4 w-4" /> Add New Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={handleCreateCategory}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FolderPlus className="h-5 w-5 text-primary" /> Create Category
            </DialogTitle>
            <DialogDescription>
              Enter a category name for grouping sports and outdoor gear.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-2">
            <label className="text-xs font-bold text-foreground">
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
            <Button
              type="submit"
              disabled={isSubmitting}
              className="gap-2 font-semibold"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Create Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
