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
        "Access high-end camping, cycling, water sports, and fitness equipment without steep upfront costs.",
    },
    {
      icon: ShieldCheck,
      title: "Verified Quality & Safety",
      description:
        "Every item undergoes verification by trusted providers to ensure safety and peak condition.",
    },
    {
      icon: HeartHandshake,
      title: "Empowering Providers",
      description:
        "Turn unused gear into earnings with our seamless, provider-friendly rental platform.",
    },
    {
      icon: Truck,
      title: "Hassle-Free Rentals",
      description:
        "Flexible dates, transparent rental durations, and automated updates keep adventures smooth.",
    },
  ];

  const teamValues = [
    "Sustainability over consumer waste",
    "Community-driven adventures",
    "Seamless & secure payments",
    "Uncompromising gear quality",
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12 md:space-y-16">
      {/* 🌟 Header & Hero Section (Consistent with Gear Page Header Style) */}
      <section className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4 lg:max-w-xl">
          <Badge
            variant="outline"
            className="border-primary/20 bg-primary/10 text-primary px-3 py-1 text-xs font-semibold tracking-wide"
          >
            <Sparkles className="mr-1.5 inline-block h-3.5 w-3.5" />
            Reimagining Outdoor Rentals
          </Badge>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Gear Up for Your Next Adventure{" "}
            <span className="text-primary">Without Limits.</span>
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            GearUp connects thrill-seekers with top-tier sports and outdoor
            equipment. Whether you&apos;re scaling a peak, camping under the stars,
            or cycling new trails, we make premium gear accessible and
            affordable.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Button size="lg" asChild className="gap-2 shadow-sm font-medium">
              <Link href="/gear">
                Explore Gear Catalog <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register">Become a Provider</Link>
            </Button>
          </div>
        </div>

        {/* Hero Image Showcase */}
        <div className="relative w-full lg:max-w-lg aspect-4/3 overflow-hidden rounded-2xl border border-border shadow-md">
          <Image
            src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1200&auto=format&fit=crop"
            alt="Outdoor Camping and Gear"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent flex items-end p-6">
            <p className="text-xs sm:text-sm font-medium text-foreground">
              Rent top-quality gear anytime, anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* 📊 Impact Stats */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-border/60 bg-card/50 shadow-none transition-colors hover:border-border"
          >
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
                {stat.value}
              </div>
              <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* 🎯 Our Mission Section */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-video lg:aspect-square w-full overflow-hidden rounded-2xl border border-border/60 shadow-md">
          <Image
            src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1200&auto=format&fit=crop"
            alt="Skiing and Winter Sports Gear"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Trophy className="h-4 w-4" />
            <span>Our Mission</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Making Sports & Outdoor Equipment Accessible to Everyone
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Buying expensive equipment for seasonal sports or one-off trips
            often leads to crowded closets and unnecessary costs. GearUp is
            designed to change that.
          </p>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            We offer a shared platform where customers get flexible access to
            high-grade equipment, and providers build thriving local rental
            businesses.
          </p>

          {/* Value Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {teamValues.map((value, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-foreground">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎛️ Why Choose GearUp (Cards matching UI style) */}
      <section className="space-y-6">
        <div className="max-w-xl space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Why Adventurers Choose GearUp
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Everything you need for a smooth, reliable, and secure rental
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={idx}
                className="border-border/60 bg-card hover:border-primary/50 transition-all duration-200"
              >
                <CardContent className="p-5 space-y-3">
                  <div className="p-2.5 w-fit rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-foreground">
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

      {/* 📦 Ecosystem Overview (Dual Role Cards) */}
      <section className="rounded-2xl border border-border/60 bg-muted/20 p-6 sm:p-8 md:p-10 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <Badge
            variant="outline"
            className="border-primary/20 text-primary text-xs"
          >
            Platform Ecosystem
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Built for Adventurers & Equipment Owners
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Customers */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-xs space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary tracking-wider uppercase">
                  For Customers
                </span>
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold">Rent Gear in 3 Easy Steps</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-foreground">1.</span> Search
                  gear and pick your rental dates.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-foreground">2.</span> Pay
                  securely via Stripe or SSLCommerz.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-foreground">3.</span> Pick up
                  your equipment and hit the trails.
                </li>
              </ul>
            </div>
          </div>

          {/* Providers */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-xs space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
                  For Equipment Owners
                </span>
                <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold">Monetize Your Equipment</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-foreground">1.</span> List
                  items with custom prices and availability.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-foreground">2.</span> Manage
                  incoming orders and rental schedules.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-foreground">3.</span> Receive
                  payouts directly to your account.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 Call to Action Footer Box */}
      <section className="rounded-2xl bg-primary text-primary-foreground p-8 sm:p-10 text-center space-y-5 shadow-lg">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
          Ready to Start Your Next Adventure?
        </h2>
        <p className="max-w-md mx-auto text-primary-foreground/80 text-xs sm:text-sm">
          Join thousands of outdoor enthusiasts and verified providers using
          GearUp today.
        </p>
        <div className="pt-2">
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="font-semibold shadow-xs"
          >
            <Link href="/gear">Explore Available Gear</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
