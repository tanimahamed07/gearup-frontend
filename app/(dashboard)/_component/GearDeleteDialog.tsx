"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteGearItem } from "../_action/deleteGearItem";

interface GearDeleteDialogProps {
  gearId: string;
  gearName: string;
}

export function GearDeleteDialog({ gearId, gearName }: GearDeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await deleteGearItem(gearId);
      
      if (res?.success) {
        setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex w-full items-center gap-2 px-2 py-1.5 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-sm transition-colors cursor-pointer">
          <Trash2 className="h-4 w-4" />
          <span>Delete</span>
        </button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-destructive flex items-center gap-2">
            Delete Gear Item
          </DialogTitle>
          <DialogDescription className="pt-2">
            Are you sure you want to delete <strong className="text-foreground">{gearName}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
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
  );
}