import { Star } from "lucide-react";
import React from "react";
import { ReviewActions } from "./ReviewActions";
import { Card } from "../ui/card";

export interface IReviewItem {
  id: string;
  comment: string;
  rating: number;
  customerId: string;
  gearItemId: string;
  createdAt: string;
  customer: {
    id: string;
    name: string;
  };
}

export default function ReviewCard({ rev }: { rev?: IReviewItem | null }) {
  return (
    <Card className="p-5 border border-border/60 bg-card shadow-sm space-y-3 flex flex-col justify-between">
      <div>
        {/* User Profile & Actions */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
              {rev?.customer?.name
                ? rev.customer.name.charAt(0).toUpperCase()
                : "U"}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground leading-tight">
                {rev?.customer?.name}
              </h4>
              <span className="text-xs text-muted-foreground">
                {rev?.createdAt
                  ? new Date(rev.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Recently"}
              </span>
            </div>
          </div>

          {/* EDIT & DELETE DROPDOWN MODAL CONTROL */}
          <ReviewActions review={rev} />
        </div>

        {/* Star Rating Render */}
        <div className="flex items-center gap-0.5 mt-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < (rev?.rating || 0)
                  ? "text-amber-500 fill-amber-500"
                  : "text-muted border-muted fill-muted/30"
              }`}
            />
          ))}
        </div>

        {/* Review Text Body */}
        <p className="mt-2 text-sm text-muted-foreground/90 leading-relaxed">
          {rev?.comment}
        </p>
      </div>
    </Card>
  );
}
