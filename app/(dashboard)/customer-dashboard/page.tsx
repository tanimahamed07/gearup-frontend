import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import {
  ShoppingBag,
  Clock,
  DollarSign,
  Star,
  Package,
  Calendar,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { dashboardOverview } from "../_action/dashboardOverview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";

export interface ICustomerStats {
  totalRentals: number;
  totalSpent: string | number;
  activeRentals: number;
  totalReviews: number;
}

export interface IRecentRentalItem {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
  totalAmount: string | number;
  createdAt?: string;
  payment?: {
    status: string;
    amount: string | number;
  };
  rentalOrderItems?: Array<{
    id: string;
    gearItem?: {
      name: string;
      image: string;
    };
  }>;
}

export interface IRecentReview {
  id: string;
  comment: string;
  rating: number;
  createdAt: string;
  gear?: {
    id: string;
    name: string;
    image: string;
  };
}

export interface ICustomerDashboardData {
  stats: ICustomerStats;
  recentRentals: IRecentRentalItem[];
  recentReviews: IRecentReview[];
}

export default async function CustomerOverviewPage() {
  const res = await dashboardOverview();
  const dashboardData: ICustomerDashboardData | null = res?.data || null;

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-4">
        <div className="text-center max-w-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mx-auto mb-4 shadow-inner">
            <Package className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-foreground">
            Failed to load dashboard
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            We could&apos;t fetch your dashboard overview. Please try
            refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  const { stats, recentRentals, recentReviews } = dashboardData;

  // Status Badge Helper consistent with OrderRow & OrderDetailsPage
  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PAID":
      case "CONFIRMED":
      case "COMPLETED":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
            {status}
          </Badge>
        );
      case "PLACED":
      case "PENDING":
        return (
          <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 whitespace-nowrap">
            Pending
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge className="bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-500/30 whitespace-nowrap">
            Cancelled
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="whitespace-nowrap">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            Dashboard Overview
            <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500/20" />
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Welcome back! Track your active rentals, spending, and recent
            activity.
          </p>
        </div>
        <Button asChild className="gap-2 shadow-xs w-fit">
          <Link href="/gears">
            <ShoppingBag className="h-4 w-4" /> Browse Gear
          </Link>
        </Button>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Spent */}
        <Card className="border border-border/60 shadow-xs rounded-xl overflow-hidden bg-card hover:border-border transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total Spent
            </CardTitle>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-foreground tracking-tight">
              ${Number(stats?.totalSpent || 0).toFixed(2)}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1 font-medium">
              <TrendingUp className="h-3 w-3 text-emerald-500" /> Lifetime
              rental spending
            </p>
          </CardContent>
        </Card>

        {/* Total Rentals */}
        <Card className="border border-border/60 shadow-xs rounded-xl overflow-hidden bg-card hover:border-border transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total Rentals
            </CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <ShoppingBag className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-foreground tracking-tight">
              {stats?.totalRentals || 0}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1 font-medium">
              Completed & ongoing orders
            </p>
          </CardContent>
        </Card>

        {/* Active Rentals */}
        <Card className="border border-border/60 shadow-xs rounded-xl overflow-hidden bg-card hover:border-border transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Active Rentals
            </CardTitle>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-foreground tracking-tight">
              {stats?.activeRentals || 0}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1 font-medium">
              Gear currently in use
            </p>
          </CardContent>
        </Card>

        {/* Total Reviews */}
        <Card className="border border-border/60 shadow-xs rounded-xl overflow-hidden bg-card hover:border-border transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total Reviews
            </CardTitle>
            <div className="p-2 rounded-lg bg-amber-400/10 text-amber-500">
              <Star className="h-4 w-4 fill-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-foreground tracking-tight">
              {stats?.totalReviews || 0}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1 font-medium">
              Feedback submitted
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Layout with items-start for Height Alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Recent Rentals List */}
        <Card className="lg:col-span-2 border border-border/60 shadow-xs rounded-xl overflow-hidden bg-card h-fit">
          <CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Recent Orders
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="gap-1 text-xs font-medium hover:bg-muted"
              >
                <Link href="/customer-dashboard/orders">
                  View All <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 divide-y divide-border/40">
            {recentRentals && recentRentals.length > 0 ? (
              recentRentals.slice(0, 5).map((order) => {
                const firstGearItem = order.rentalOrderItems?.[0]?.gearItem;

                return (
                  <div
                    key={order.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:px-6 gap-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {firstGearItem?.image && (
                        <div className="relative h-11 w-11 rounded-lg overflow-hidden bg-muted border border-border/60 shrink-0 shadow-2xs">
                          <Image
                            src={firstGearItem.image}
                            alt={firstGearItem.name || "Gear"}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      )}
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex items-center gap-1 min-w-0">
                            <span className="font-mono text-xs font-bold bg-muted px-2 py-0.5 rounded border border-border/60 text-foreground break-all">
                              #{order.id}
                            </span>
                            <CopyButton value={order.id} />
                          </div>
                          {getStatusBadge(order.status)}
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>
                            {format(new Date(order.startDate), "MMM dd")} -{" "}
                            {format(new Date(order.endDate), "MMM dd, yyyy")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-border/30">
                      <span className="font-extrabold text-sm text-foreground">
                        ${Number(order.totalAmount).toFixed(2)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="h-8 text-xs gap-1 hover:bg-primary hover:text-primary-foreground shrink-0"
                      >
                        <Link href={`/customer-dashboard/orders/${order.id}`}>
                          Details <ChevronRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3 shadow-inner">
                  <ShoppingBag className="h-7 w-7" />
                </div>
                <h3 className="text-base font-bold mb-1">No orders found</h3>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Your recent rental orders will appear here once placed.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Reviews Side Card */}
        <Card className="border border-border/60 shadow-xs rounded-xl overflow-hidden bg-card h-fit">
          <CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-4">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
              Recent Reviews
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {recentReviews && recentReviews.length > 0 ? (
              recentReviews.map((review) => (
                <div
                  key={review.id}
                  className="p-3.5 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/50 transition-colors space-y-2.5"
                >
                  {review.gear && (
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative h-8 w-8 shrink-0 rounded-md overflow-hidden bg-background border shadow-2xs">
                        <Image
                          src={review.gear.image || "/placeholder.png"}
                          alt={review.gear.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <Link
                        href={`/gears/${review.gear.id}`}
                        className="text-xs font-bold hover:underline line-clamp-1 flex items-center gap-1 text-foreground hover:text-primary transition-colors"
                      >
                        <span className="truncate">{review.gear.name}</span>
                        <ArrowUpRight className="h-3 w-3 shrink-0 text-muted-foreground" />
                      </Link>
                    </div>
                  )}

                  <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed italic">
                    &ldquo;{review.comment}&rdquo;
                  </p>

                  <p className="text-[10px] text-muted-foreground/70 font-medium text-right">
                    {format(new Date(review.createdAt), "MMM dd, yyyy")}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted mb-3">
                  <Star className="h-6 w-6 text-muted-foreground/60" />
                </div>
                <p className="text-xs font-semibold text-muted-foreground">
                  No reviews submitted yet
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}