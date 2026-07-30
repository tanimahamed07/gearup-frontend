"use client";

import { useState } from "react";
import { Plus, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export function CreateReviewModal({ gearId }: { gearId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    try {
      setLoading(true);
      // TODO: Call your Server Action / API endpoint to submit review
      // await createGearReview({ gearId, rating, comment });
      console.log("Submitting review for gear:", gearId, { rating, comment });

      setComment("");
      setRating(5);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to post review", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2 shadow-sm">
          <Plus className="h-4 w-4" /> Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your experience using this gear to help other renters.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3">
          {/* Rating Choice */}
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
              placeholder="What did you like or dislike about this gear?"
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading || !comment.trim()}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}