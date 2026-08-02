import Link from "next/link";
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
import GearCard from "./_components/GearCard";
import { IGearItem } from "@/lib/types/types";

export default async function HomePage() {
  const result = await getAllGearItems();
  const gearItems: IGearItem[] = result?.data || [];

  // Top 8 Featured items display
  const featuredGears = gearItems.slice(0, 8);

  return (
    <div className="space-y-12 sm:space-y-16 md:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-primary/5 via-background to-background pt-8 pb-16 sm:pt-12 sm:pb-20 md:pt-16 md:pb-28">
        {/* Ambient Background Glow Effect */}
        <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-64 w-64 sm:h-96 sm:w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px] sm:blur-[120px]" />

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-6">
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

              {/* High-Impact Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.15]">
                Everything You Need To{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-indigo-500">
                  Create Without Limits
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Access thousands of verified gear items from creative
                professionals nearby. Rent top-quality equipment on demand with
                flexible duration and complete insurance coverage.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3">
                <Button
                  size="lg"
                  asChild
                  className="w-full sm:w-auto gap-2 font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Link href="/gear">
                    Explore Gear <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="w-full sm:w-auto font-medium text-sm sm:text-base"
                >
                  <Link href="/register">List Your Gear</Link>
                </Button>
              </div>

              {/* Value Proposition Highlights */}
              <div className="pt-6 sm:pt-8 border-t border-border/40 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center justify-center lg:justify-start gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-xs sm:text-sm">
                      Fully Insured
                    </p>
                    <p className="text-[11px] sm:text-xs text-muted-foreground">
                      Peace of mind guaranteed
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-2.5">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-xs sm:text-sm">
                      Flexible Booking
                    </p>
                    <p className="text-[11px] sm:text-xs text-muted-foreground">
                      Daily or weekly rentals
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-2.5">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500 shrink-0">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-xs sm:text-sm">
                      Verified Owners
                    </p>
                    <p className="text-[11px] sm:text-xs text-muted-foreground">
                      Trusted community
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Feature Box */}
            <div className="lg:col-span-5 relative flex justify-center items-center mt-4 lg:mt-0">
              {/* Glow backdrop behind card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-purple-500/20 to-indigo-500/20 rounded-3xl blur-2xl transform rotate-2 scale-95 pointer-events-none" />

              {/* Showcase Card */}
              <div className="relative w-full max-w-md rounded-2xl border border-border/60 bg-card/90 backdrop-blur-xl p-5 sm:p-6 shadow-xl space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border/40 pb-3 sm:pb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-[10px] font-mono tracking-wider uppercase bg-primary/10 text-primary border-primary/20"
                  >
                    Live Marketplace
                  </Badge>
                </div>

                {/* Platform Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border border-border/50 bg-background/50 space-y-1">
                    <div className="flex items-center gap-1.5 text-primary">
                      <Camera className="h-3.5 w-3.5" />
                      <span className="text-xs font-semibold">
                        Gears Listed
                      </span>
                    </div>
                    <p className="text-xl sm:text-2xl font-black text-foreground">
                      500+
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Across Categories
                    </p>
                  </div>

                  <div className="p-3 rounded-xl border border-border/50 bg-background/50 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-500">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span className="text-xs font-semibold">Renters</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-black text-foreground">
                      1.2k+
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Verified Users
                    </p>
                  </div>
                </div>

                {/* Mini Category Preview List */}
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Popular Inventory
                  </p>

                  <div className="space-y-2">
                    {[
                      {
                        label: "Cinema Cameras & Rigs",
                        price: "from $45/day",
                        color: "bg-emerald-500",
                      },
                      {
                        label: "Anamorphic & Prime Lenses",
                        price: "from $25/day",
                        color: "bg-amber-500",
                      },
                      {
                        label: "Studio Lighting & Audio",
                        price: "from $15/day",
                        color: "bg-blue-500",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-lg border border-border/40 bg-muted/30 hover:bg-muted/60 transition-colors text-xs"
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <span
                            className={`h-2 w-2 rounded-full shrink-0 ${item.color}`}
                          />
                          <span className="font-medium text-foreground truncate">
                            {item.label}
                          </span>
                        </div>
                        <span className="text-muted-foreground font-mono text-[11px] shrink-0">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Trust Badge */}
                <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    <strong className="text-foreground">4.9/5</strong> Rating
                  </span>
                  <span className="text-primary font-medium">
                    Instant Booking
                  </span>
                </div>

                {/* Floating Decorative Badge (Visible on larger screens) */}
                <div className="hidden sm:flex absolute -bottom-4 -left-4 rounded-xl border border-border/60 bg-background/95 backdrop-blur-md p-3 shadow-xl items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">
                      Zero Deposit Options
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      For Verified Users
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER FOR REMAINING SECTIONS */}
      <div className="container mx-auto px-4 space-y-12 sm:space-y-16 md:space-y-20">
        {/* 2. CATEGORIES OVERVIEW */}
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Browse by Category
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Find the exact equipment you need for your next project or
              adventure.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { name: "Camera", count: "120+ Items", icon: Camera },
              { name: "Lenses", count: "85+ Items", icon: SlidersHorizontal },
              { name: "Lighting", count: "40+ Items", icon: Sparkles },
              { name: "Audio Gear", count: "60+ Items", icon: ShieldCheck },
            ].map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <Link
                  key={idx}
                  href={`/gear?category=${cat.name}`}
                  className="group p-4 sm:p-5 rounded-xl border border-border/60 bg-card hover:bg-muted/40 hover:border-primary/50 transition-all duration-200 text-center flex flex-col items-center gap-3 shadow-2xs"
                >
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <IconComp className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs sm:text-sm md:text-base text-foreground group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                      {cat.count}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 3. FEATURED GEARS SECTION */}
        <section className="space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <Badge
                variant="outline"
                className="text-primary border-primary/30 mb-2 text-xs"
              >
                Trending Rentals
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Featured Gear Items
              </h2>
            </div>
            <Button
              variant="ghost"
              asChild
              className="gap-2 w-fit text-xs sm:text-sm"
            >
              <Link href="/gear">
                View All Gear <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {featuredGears.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {featuredGears.map((item) => (
                <GearCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16 border rounded-xl bg-muted/20 text-muted-foreground text-xs sm:text-sm">
              No gear items found. Check back later!
            </div>
          )}
        </section>

        {/* 4. WHY CHOOSE US */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6 sm:py-8 border-y border-border/40">
          <div className="flex items-start gap-3.5 p-2 sm:p-4">
            <div className="p-2.5 sm:p-3 rounded-xl bg-primary/10 text-primary shrink-0">
              <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-sm sm:text-base">
                Insured & Verified
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every listed gear item undergoes strict quality checks to ensure
                optimal working condition.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-2 sm:p-4">
            <div className="p-2.5 sm:p-3 rounded-xl bg-primary/10 text-primary shrink-0">
              <Truck className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-sm sm:text-base">
                Easy Pickup & Return
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Flexible location pickups and hassle-free returns directly with
                equipment owners.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-2 sm:p-4 sm:col-span-2 md:col-span-1">
            <div className="p-2.5 sm:p-3 rounded-xl bg-primary/10 text-primary shrink-0">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-sm sm:text-base">
                Instant Booking
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Reserve your items with a few clicks and receive instant
                confirmation for your chosen dates.
              </p>
            </div>
          </div>
        </section>

        {/* 5. CALL TO ACTION (CTA) */}
        <section className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 sm:p-10 md:p-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Have unused gear?
            </h2>
            <p className="text-primary-foreground/80 text-xs sm:text-sm">
              List your equipment on GearUp and start earning passive income
              today.
            </p>
          </div>
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="w-full sm:w-auto font-semibold shrink-0"
          >
            <Link href="/register">Become a Provider</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
