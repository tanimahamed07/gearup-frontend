"use client";

import React, { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteCategory } from "../_action/deleteCategory";

interface ICategory {
  id: string;
  name: string;
}

interface CategoryDeleteDialogProps {
  category: ICategory | null;
  onClose: () => void;
}

export function CategoryDeleteDialog({
  category,
  onClose,
}: CategoryDeleteDialogProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDeleteCategory = async () => {
    if (!category) return;

    try {
      setIsDeleting(true);
      const res = await deleteCategory(category.id);

      if (res?.success) {
        toast.success(`Category "${category.name}" deleted successfully!`);
        onClose();
        router.refresh(); // Refresh server component data
      } else {
        toast.error(res?.message || "Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Something went wrong while deleting!");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={!!category} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" /> Delete Category
          </DialogTitle>
          <DialogDescription className="pt-2">
            Are you sure you want to delete{" "}
            <span className="font-bold text-foreground">{category?.name}</span>?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={confirmDeleteCategory}
            disabled={isDeleting}
            className="gap-2"
          >
            {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
