import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Camera,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
  Star,
  Clock,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";

import { getAllGearItems } from "./_action/getAllGear";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export interface IGearItem {
  id: string;
  name: string;
  brand: string;
  category?: { name: string };
  pricePerDay: string | number;
  image?: string;
  description?: string;
  isAvailable?: boolean;
}

export default async function HomePage() {
  const result = await getAllGearItems();
  const gearItems: IGearItem[] = result?.data || [];

  // Top 6 Featured items display
  const featuredGears = gearItems.slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 border-b border-border/40 bg-gradient-to-b from-primary/5 via-background to-background">
        {/* Ambient Background Glow Effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Text & CTAs */}
            {/* Left Column: Generic Brand & Value Focus */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              {/* Live Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-xs font-semibold text-primary tracking-wide">
                  Next-Gen Production Rental Network
                </span>
              </div>

              {/* Generic High-Impact Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.15]">
                Everything You Need To{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-indigo-500">
                  Create Without Limits
                </span>
              </h1>

              {/* Broad Subtitle */}
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Access thousands of verified gear items from creative
                professionals nearby. Rent top-quality equipment on demand with
                flexible duration and complete insurance coverage.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button
                  size="lg"
                  asChild
                  className="w-full sm:w-auto gap-2 font-semibold text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
                >
                  <Link href="/gears">
                    Explore Gears <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

              </div>

              {/* Value Proposition Highlights */}
              <div className="pt-8 border-t border-border/40 grid grid-cols-3 gap-3 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-500">
                    <ShieldCheck className="h-4 w-4 shrink-0" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-xs">
                      Fully Insured
                    </p>
                    <p className="text-[10px] text-muted-foreground hidden sm:block">
                      Peace of mind guaranteed
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                    <Clock className="h-4 w-4 shrink-0" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-xs">
                      Flexible Booking
                    </p>
                    <p className="text-[10px] text-muted-foreground hidden sm:block">
                      Daily or weekly rentals
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-500">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-xs">
                      Verified Owners
                    </p>
                    <p className="text-[10px] text-muted-foreground hidden sm:block">
                      Trusted community
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Feature Box */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              {/* Glow backdrop behind card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-purple-500/20 to-indigo-500/20 rounded-3xl blur-2xl transform rotate-2 scale-95" />

              {/* Interactive Hub Showcase Card */}
              <div className="relative w-full max-w-md rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl p-6 shadow-2xl space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border/40 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-[10px] font-mono tracking-wider uppercase bg-primary/10 text-primary"
                  >
                    Live Marketplace
                  </Badge>
                </div>

                {/* Platform Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-border/50 bg-background/50 space-y-1">
                    <div className="flex items-center gap-1.5 text-primary">
                      <Camera className="h-4 w-4" />
                      <span className="text-xs font-semibold">
                        Gears Available
                      </span>
                    </div>
                    <p className="text-2xl font-black text-foreground">500+</p>
                    <p className="text-[10px] text-muted-foreground">
                      Across 12 Categories
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-border/50 bg-background/50 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-500">
                      <ShieldCheck className="h-4 w-4" />
                      <span className="text-xs font-semibold">
                        Active Renters
                      </span>
                    </div>
                    <p className="text-2xl font-black text-foreground">1.2k+</p>
                    <p className="text-[10px] text-muted-foreground">
                      Verified Creators
                    </p>
                  </div>
                </div>

                {/* Mini Category Preview List */}
                <div className="space-y-2.5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Popular Inventory
                  </p>

                  <div className="space-y-2">
                    {[
                      {
                        label: "Cinema Cameras & Rigs",
                        price: "from $45/day",
                        status: "In Stock",
                        color: "bg-emerald-500",
                      },
                      {
                        label: "Anamorphic & Prime Lenses",
                        price: "from $25/day",
                        status: "High Demand",
                        color: "bg-amber-500",
                      },
                      {
                        label: "Studio Lighting & Audio",
                        price: "from $15/day",
                        status: "Available",
                        color: "bg-blue-500",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-lg border border-border/40 bg-muted/30 hover:bg-muted/60 transition-colors text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${item.color}`}
                          />
                          <span className="font-medium text-foreground">
                            {item.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground font-mono">
                            {item.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Trust Badge */}
                <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    <strong className="text-foreground">4.9/5</strong> Renter
                    Rating
                  </span>
                  <span className="text-primary font-medium cursor-pointer hover:underline">
                    Instant Booking Active
                  </span>
                </div>

                {/* Floating Decorative Badge */}
                <div className="absolute -bottom-4 -left-4 rounded-xl border border-border/60 bg-background/95 backdrop-blur-md p-3 shadow-xl flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">
                      Zero Deposit Options
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Available for Verified Users
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* 2. CATEGORIES OVERVIEW */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Browse by Category
            </h2>
            <p className="text-muted-foreground text-sm">
              Find the exact tools you need for film, photo, or audio
              production.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { name: "Cameras", count: "120+ Items", icon: Camera },
              { name: "Lenses", count: "85+ Items", icon: SlidersHorizontal },
              { name: "Lighting", count: "40+ Items", icon: Sparkles },
              { name: "Audio Gear", count: "60+ Items", icon: ShieldCheck },
            ].map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <Link
                  key={idx}
                  href={`/gears?category=${cat.name}`}
                  className="group p-5 rounded-xl border border-border/60 bg-card hover:bg-muted/50 hover:border-primary/50 transition-all duration-200 text-center flex flex-col items-center gap-3 shadow-sm"
                >
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {cat.count}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 3. FEATURED GEARS SECTION */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <Badge
                variant="outline"
                className="text-primary border-primary/30 mb-2"
              >
                Trending Rentals
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Featured Gear Items
              </h2>
            </div>
            <Button variant="ghost" asChild className="gap-2 w-fit">
              <Link href="/gears">
                View All Gears <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {featuredGears.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGears.map((item) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <CardContent className="p-0">
                    {/* Image Box */}
                    <div className="relative aspect-[4/3] w-full bg-muted overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-background/80 backdrop-blur-md text-foreground font-semibold border border-border/50">
                          ${Number(item.pricePerDay || 0).toFixed(2)} / day
                        </Badge>
                      </div>
                    </div>

                    {/* Content Box */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{item.brand || "Generic"}</span>
                        <span className="flex items-center gap-1 text-amber-500">
                          <Star className="h-3.5 w-3.5 fill-amber-500" /> 4.9
                        </span>
                      </div>

                      <h3 className="font-bold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>

                      {item.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </CardContent>

                  {/* Card Action Button */}
                  <div className="p-5 pt-0 mt-auto">
                    <Button
                      asChild
                      className="w-full font-medium"
                      variant="secondary"
                    >
                      <Link href={`/gears/${item.id}`}>
                        View Details & Rent
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border rounded-xl bg-muted/20 text-muted-foreground">
              No gear items found. Check back later!
            </div>
          )}
        </section>

        {/* 4. WHY CHOOSE US */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-border/40">
          <div className="flex items-start gap-4 p-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-base mb-1">
                Insured & Verified
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every listed gear goes through strict quality checks to ensure
                optimal working condition.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-base mb-1">
                Easy Pickup & Return
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Flexible location pickups and hassle-free returns directly with
                gear owners.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-base mb-1">Instant Booking</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Reserve your items with a few clicks and receive instant
                confirmation for your dates.
              </p>
            </div>
          </div>
        </section>

        {/* 5. CALL TO ACTION (CTA) */}
        <section className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 sm:p-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Have unused camera gear?
            </h2>
            <p className="text-primary-foreground/80 text-sm">
              List your equipment on GearUp and start earning passive income
              today.
            </p>
          </div>
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="whitespace-nowrap font-semibold shadow-md"
          >
            <Link href="/provider-dashboard">Become a Provider</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
