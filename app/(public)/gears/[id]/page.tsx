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
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Mock/Dummy Data
const mockGearItem = {
  id: "gear-123456",
  name: "Sony Alpha A7 IV Mirrorless Camera",
  brand: "Sony",
  image:
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
  description:
    "The Sony Alpha A7 IV is a versatile camera that goes beyond the basic. Delivering outstanding 33 MP still quality, 4K 60p video recording, refined handling, and fast focus performance, it is perfect for both professional photography and videography assignments.",
  pricePerDay: 45.0,
  stock: 3,
  isAvailable: true,
  category: {
    id: "cat-1",
    name: "Cameras",
  },
};

export default function GearDetails() {
  // Real data-র বদলে Mock Data ব্যবহার করা হচ্ছে
  const item = mockGearItem;

  const isAvailable = item.isAvailable && item.stock > 0;

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
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
                    unoptimized={item.image.startsWith("http://localhost")}
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
      </div>
    </div>
  );
}
