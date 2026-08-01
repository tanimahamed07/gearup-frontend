"use client";

import { useState } from "react";
import { MoreVertical, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

interface ReviewActionsProps {
  review?: {
    id?: string;
    _id?: string;
    rating: number;
    comment?: string;
    review?: string;
  } | null;
}

export function ReviewActions({ review }: ReviewActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Form State
  const [rating, setRating] = useState(review?.rating || 5);
  const [comment, setComment] = useState(
    review?.comment || review?.review || "",
  );
  const [loading, setLoading] = useState(false);

  // Don't render if no review
  if (!review) return null;

  const reviewId = review._id || review.id || "";

  // Edit Review Handler
  const handleEdit = async () => {
    try {
      setLoading(true);
      // TODO: Connect your edit review Server Action or API
      // await updateGearReview(reviewId, { rating, comment });
      console.log("Updating review:", reviewId, { rating, comment });

      setIsEditOpen(false);
    } catch (error) {
      console.error("Failed to edit review", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Review Handler
  const handleDelete = async () => {
    try {
      setLoading(true);
      // TODO: Connect your delete review Server Action or API
      // await deleteGearReview(reviewId);
      console.log("Deleting review:", reviewId);

      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Failed to delete review", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Action Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem
            onClick={() => setIsEditOpen(true)}
            className="gap-2 cursor-pointer"
          >
            <Pencil className="h-3.5 w-3.5 text-blue-500" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDeleteOpen(true)}
            className="gap-2 text-destructive cursor-pointer focus:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* EDIT MODAL */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
            <DialogDescription>
              Update your feedback and star rating below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3">
            {/* Interactive Rating Stars */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">
                Rating
              </label>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i + 1)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        i < rating
                          ? "text-amber-500 fill-amber-500"
                          : "text-muted border-muted fill-muted/20"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Field */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">
                Comment
              </label>
              <Textarea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your experience with this gear..."
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsEditOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRMATION MODAL */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this review? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
