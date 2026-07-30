import { Star } from "lucide-react";
import React from "react";

export default function RatingOverview({
  averageRating,
  totalReviews,
}: {
  averageRating: number;
  totalReviews: number;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border/60 bg-card p-3.5 shadow-sm">
      <div className="flex items-center gap-2">
        <Star className="h-7 w-7 text-amber-500 fill-amber-500" />
        <span className="text-2xl font-extrabold text-foreground">
          {averageRating}
        </span>
      </div>
      <div className="border-l border-border pl-3.5">
        <div className="text-xs font-semibold text-foreground">
          Out of 5 Stars
        </div>
        <div className="text-xs text-muted-foreground">
          Based on {totalReviews} reviews
        </div>
      </div>
    </div>
  );
}
