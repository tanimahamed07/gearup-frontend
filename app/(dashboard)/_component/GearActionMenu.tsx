"use client";

import { useState } from "react";
import { MoreVertical, Trash2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { GearFormDialog } from "./GearFormDialog";
import { ICategory, IGearItem } from "@/lib/types/types";
import { deleteGearItem } from "../_action/deleteGearItem";

interface GearActionMenuProps {
  gear: IGearItem;
  categories: ICategory[];
}

export function GearActionMenu({ gear, categories }: GearActionMenuProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await deleteGearItem(gear.id);

      if (res?.success) {
        setShowDeleteDialog(false);
      } else {
        alert(res?.message || "Failed to delete item.");
      }
    } catch (error) {
      console.error("Delete Error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
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

          {/* Edit Dialog Trigger */}
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

          {/* Delete Dialog Trigger */}
          <DropdownMenuItem
            className="text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/40 cursor-pointer"
            onSelect={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="h-3.5 w-3.5 mr-2" />
            Delete Gear
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Confirmation Delete Modal */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-rose-600 flex items-center gap-2">
              Delete Gear Item
            </DialogTitle>
            <DialogDescription className="pt-2">
              Are you sure you want to delete{" "}
              <strong className="text-foreground">{gear.name}</strong>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Gear"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
