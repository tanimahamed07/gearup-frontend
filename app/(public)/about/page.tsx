import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  Sparkles,
  Users,
  Compass,
  Trophy,
  CheckCircle2,
  ArrowRight,
  HeartHandshake,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us | GearUp - Rent Sports & Outdoor Gear Instantly",
  description:
    "Learn more about GearUp, our mission to make outdoor adventures accessible, and how we empower gear owners and thrill-seekers alike.",
};

export default function AboutPage() {
  const stats = [
    { label: "Active Gear Items", value: "2,500+" },
    { label: "Happy Adventurers", value: "10,000+" },
    { label: "Verified Providers", value: "450+" },
    { label: "Successful Rentals", value: "18,000+" },
  ];

  const features = [
    {
      icon: Compass,
      title: "Limitless Exploration",
      description:
        "Access high-end camping, cycling, water sports, and fitness equipment without the steep upfront purchase costs.",
    },
    {
      icon: ShieldCheck,
      title: "Verified Quality & Safety",
      description:
        "Every gear listing undergo verification by trusted providers to ensure safety and peak condition before every rental.",
    },
    {
      icon: HeartHandshake,
      title: "Empowering Local Providers",
      description:
        "Turn unused gear into earnings. We provide local outdoor shops and gear owners a seamless rental management platform.",
    },
    {
      icon: Truck,
      title: "Hassle-free Pickups & Returns",
      description:
        "Flexible dates, transparent rental durations, and automated order updates keep your adventures running smoothly.",
    },
  ];

  const teamValues = [
    "Sustainability over consumer waste",
    "Community-driven adventures",
    "Seamless & secure payments",
    "Uncompromising gear quality",
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-muted/40 border border-border/50 py-16 px-6 sm:px-12 text-center lg:text-left">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 inline" /> Reimagining
              Outdoor Rentals
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground leading-tight">
              Gear Up for Your Next Adventure{" "}
              <span className="text-primary">Without Limits.</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              GearUp connects thrill-seekers with top-tier sports and outdoor
              equipment. Whether you're scaling a peak, camping under the stars,
              or cycling new trails, we make premium gear accessible,
              affordable, and instant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Button size="lg" asChild className="gap-2 shadow-md">
                <Link href="/gear">
                  Explore All Gear <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/register">Become a Provider</Link>
              </Button>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div className="relative mx-auto lg:ml-auto w-full max-w-md lg:max-w-none aspect-4/3 rounded-2xl overflow-hidden border border-border/80 shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1200&auto=format&fit=crop"
              alt="Outdoor Camping and Gear"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
              <p className="text-white text-sm font-medium">
                "Rent top-quality gear anytime, anywhere."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers / Stats */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border border-border/60 shadow-xs text-center"
            >
              <CardContent className="p-6">
                <div className="text-3xl sm:text-4xl font-black text-primary">
                  {stat.value}
                </div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Our Mission & Story */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square sm:aspect-16/10 lg:aspect-square rounded-2xl overflow-hidden border border-border/60 shadow-lg order-2 lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1200&auto=format&fit=crop"
              alt="Skiing and Winter Sports Gear"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <Trophy className="w-4 h-4" />
              <span>Our Mission</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Making Sports & Outdoor Adventures Accessible to Everyone
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Buying expensive equipment for seasonal sports or one-off trips
              often leads to crowded closets and wasted money. GearUp was built
              to break that cycle.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We provide a seamless multi-role ecosystem where **Customers** get
              flexible access to high-grade equipment, and **Providers** build
              thriving rental businesses.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {teamValues.map((value, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-xs font-semibold text-foreground">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose GearUp */}
      <section className="max-w-6xl mx-auto px-4 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Why Adventurers Choose GearUp
          </h2>
          <p className="text-muted-foreground text-sm">
            Everything you need for a smooth, reliable, and secure rental
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={idx}
                className="border border-border/60 shadow-xs hover:border-primary/40 transition-colors"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-base text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How It Works Overview */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="rounded-3xl bg-muted/30 border border-border/60 p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <Badge variant="outline" className="border-primary/30 text-primary">
              Ecosystem
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Built for Adventurers & Equipment Owners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customer Box */}
            <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  For Customers
                </span>
                <Users className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold">Rent in 3 Simple Steps</h3>
              <ul className="space-y-3 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-foreground">1.</span> Search
                  and select your preferred dates.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-foreground">2.</span> Pay
                  securely via Stripe or SSLCommerz.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-foreground">3.</span> Pick up
                  your gear, enjoy your trip, and return.
                </li>
              </ul>
              <Button size="sm" className="w-full mt-2" asChild>
                <Link href="/gear">Browse Catalogue</Link>
              </Button>
            </div>

            {/* Provider Box */}
            <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                  For Providers
                </span>
                <ShieldCheck className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold">Monetize Your Equipment</h3>
              <ul className="space-y-3 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-foreground">1.</span> List
                  sports gear with pricing & availability.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-foreground">2.</span> Confirm
                  orders and track rental inventory.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-foreground">3.</span> Receive
                  payouts safely directly to your account.
                </li>
              </ul>
              <Button
                size="sm"
                variant="secondary"
                className="w-full mt-2"
                asChild
              >
                <Link href="/register">Start Renting Out</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="rounded-3xl bg-primary text-primary-foreground p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Start Your Journey?
          </h2>
          <p className="max-w-xl mx-auto text-primary-foreground/80 text-sm sm:text-base">
            Join thousands of outdoors enthusiasts and equipment providers using
            GearUp today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button size="lg" variant="secondary" asChild className="font-bold">
              <Link href="/gears">Explore Available Gear</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
