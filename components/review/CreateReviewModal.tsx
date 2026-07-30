"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  ReviewFormValues,
  reviewSchema,
} from "@/lib/validations/review.schema";
import { createReviewAction } from "@/service/review/createReview";
import { toast } from "sonner";

export function CreateReviewModal({ gearId }: { gearId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      comment: "",
    },
  });

  const onSubmit = async (data: ReviewFormValues) => {
    try {
      const res = await createReviewAction({
        gearItemId: gearId,
        rating: data.rating,
        comment: data.comment,
      });
      console.log(res);

      if (res?.success) {
        toast.success(res.message || "Review submitted successfully!");
        reset(); // ফর্ম রিসেট করা
        setIsOpen(false); // ডায়ালগ বন্ধ করা
      } else {
        toast.error(res?.message || "Failed to submit review");
        console.error(res);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-3">
          {/* Rating Choice using Controller */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Rating
            </label>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => field.onChange(i + 1)}
                      className="p-1 transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          i < field.value
                            ? "text-amber-500 fill-amber-500"
                            : "text-muted border-muted fill-muted/20"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            />
            {errors.rating && (
              <p className="text-xs text-destructive mt-1">
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* Comment Field */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Comment
            </label>
            <Textarea
              rows={4}
              placeholder="What did you like or dislike about this gear?"
              className="resize-none"
              {...register("comment")}
            />
            {errors.comment && (
              <p className="text-xs text-destructive mt-1">
                {errors.comment.message}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit Review
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
