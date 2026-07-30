import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Tag,
  Package,
  ShieldCheck,
  ArrowLeft,
  Calendar,
  Share2,
  Heart,
  Star,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getGearDetails } from "../../_action/getGearById";
import { getGearReview } from "@/service/review/getGearReview";

// Integrated Components
import { CreateReviewModal } from "@/components/review/CreateReviewModal";
import ReviewCard, { IReviewItem } from "@/components/review/ReviewCard";
import RatingOverview from "@/components/review/RatingOverview";

type IReview = {
  comment: string;
  rating: number;
  customerId: string;
  gearItemId: string;
};

export default async function GearDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await getGearDetails(id);
  const reviewRes = await getGearReview(id);

  if (!result || !result?.data) {
    return (
      <div className="flex h-96 flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-bold mb-2">Gear Not Found!</h2>
        <p className="text-muted-foreground mb-4">
          The gear item with ID{" "}
          <strong className="text-foreground">{id}</strong> does not exist.
        </p>
        <Button asChild variant="outline">
          <Link href="/gears">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Gears
          </Link>
        </Button>
      </div>
    );
  }

  const item = result.data;
  const isAvailable = item.isAvailable && item.stock > 0;

  // Review extraction safely
  const reviewData = reviewRes?.data || {};
  const reviewList = reviewData?.reviews || [];
  console.log(reviewList);
  const averageRating = reviewData?.averageRating || 0;
  const totalReviews = reviewData?.totalReviews || 0;

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button & Actions Bar */}
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Link href="/gears">
              <ArrowLeft className="h-4 w-4" /> Back to Gears
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Image Section */}
          <div className="lg:col-span-7">
            <Card className="overflow-hidden rounded-xl border border-border/60 bg-card p-0 shadow-sm">
              <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    unoptimized={item.image.startsWith("http")}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/10">
                    <Package className="h-20 w-20 text-muted-foreground/30" />
                  </div>
                )}

                {/* Stock Status Badge */}
                <div className="absolute top-4 right-4">
                  {isAvailable ? (
                    <Badge className="bg-emerald-500/90 text-white backdrop-blur-md shadow-sm border-0 px-3 py-1 text-xs">
                      <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> In Stock
                    </Badge>
                  ) : (
                    <Badge
                      variant="destructive"
                      className="shadow-sm px-3 py-1 text-xs"
                    >
                      <XCircle className="mr-1.5 h-3.5 w-3.5" /> Out of Stock
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Information & Booking Section */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              {/* Category & Brand Header */}
              <div className="mb-3 flex items-center justify-between gap-2">
                <Badge
                  variant="secondary"
                  className="px-2.5 py-0.5 text-xs font-medium bg-secondary/60"
                >
                  <Tag className="mr-1.5 h-3 w-3" />{" "}
                  {item.category?.name || "General"}
                </Badge>
                <span className="text-xs text-muted-foreground font-medium">
                  Available Stock:{" "}
                  <strong className="text-foreground">{item.stock}</strong>
                </span>
              </div>

              {/* Title & Brand Name */}
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl tracking-tight">
                {item.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground font-medium">
                Brand:{" "}
                <span className="text-foreground font-semibold">
                  {item.brand}
                </span>
              </p>

              {/* Quick Rating Header View */}
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center text-amber-500">
                  <Star className="h-4 w-4 fill-amber-500" />
                  <span className="ml-1 text-sm font-semibold text-foreground">
                    {averageRating}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
                </span>
              </div>

              {/* Price Box */}
              <div className="mt-6 flex items-baseline gap-1 rounded-lg border border-border/50 bg-muted/30 p-4">
                <span className="text-3xl font-extrabold text-primary">
                  ${Number(item.pricePerDay).toFixed(2)}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  / day
                </span>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-foreground">
                  Description
                </h3>
                <p className="mt-2 text-sm text-muted-foreground/90 leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>

              {/* Features / Highlights */}
              <div className="mt-6 border-t border-border/50 pt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" /> Verified
                  quality & gear maintenance
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" /> Flexible rental
                  duration
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="mt-8 border-t border-border/60 pt-4">
              <Button
                size="lg"
                className="w-full text-sm font-semibold shadow-md transition-all h-11"
                disabled={!isAvailable}
              >
                {isAvailable ? "Book This Gear" : "Currently Unavailable"}
              </Button>
            </div>
          </div>
        </div>

        {/* ======================================= */}
        {/* REVIEWS SECTION                          */}
        {/* ======================================= */}
        <div className="mt-16 border-t border-border/60 pt-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Customer Reviews
              </h2>
              <p className="text-sm text-muted-foreground">
                Read what others have to say about this gear
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* Overall Rating Overview Card */}

              <RatingOverview
                averageRating={averageRating}
                totalReviews={totalReviews}
              ></RatingOverview>
              {/* WRITE A REVIEW BUTTON */}
              <CreateReviewModal gearId={id} />
            </div>
          </div>

          {/* Review List Display */}
          {reviewList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviewList.map((rev: IReviewItem) => (
                <ReviewCard key={rev?.id} rev={rev} />
              ))}
            </div>
          ) : (
            <Card className="flex flex-col items-center justify-center p-8 text-center bg-muted/20 border-dashed">
              <Star className="h-10 w-10 text-muted-foreground/30 mb-2" />
              <h3 className="font-semibold text-foreground">No Reviews Yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Be the first to rent and review this gear!
              </p>
              <CreateReviewModal gearId={id} />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
