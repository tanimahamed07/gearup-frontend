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
} from "lucide-react";

import { dashboardOverview } from "../_action/dashboardOverview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mx-auto mb-3">
            <Package className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold">Failed to load dashboard</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  const { stats, recentRentals, recentReviews } = dashboardData;

  // Status Badge Helper consistent with OrderRow
  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PAID":
      case "CONFIRMED":
      case "COMPLETED":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20">
            {status}
          </Badge>
        );
      case "PLACED":
      case "PENDING":
        return (
          <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/20">
            Pending
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge className="bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/20">
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header - Styled to match OrderHistoryPage */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back! Track your active rentals, spending, and recent
            activity.
          </p>
        </div>
        <Button asChild className="gap-2 shadow-sm">
          <Link href="/gears">
            <ShoppingBag className="h-4 w-4" /> Browse Gear
          </Link>
        </Button>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Spent
            </CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${Number(stats?.totalSpent || 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Lifetime rental spending
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Rentals
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats?.totalRentals || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Completed & ongoing orders
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Rentals
            </CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats?.activeRentals || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Gear currently in use
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Reviews
            </CardTitle>
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats?.totalReviews || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Feedback submitted
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Rentals List */}
        <Card className="lg:col-span-2 border border-border/60 shadow-sm">
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
                className="gap-1 text-xs font-normal"
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
                    <div className="flex items-center gap-3">
                      {firstGearItem?.image && (
                        <div className="relative h-10 w-10 rounded-md overflow-hidden bg-muted border shrink-0">
                          <Image
                            src={firstGearItem.image}
                            alt={firstGearItem.name || "Gear"}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-foreground">
                            Order #{order.id.slice(0, 8)}
                          </span>
                          {getStatusBadge(order.status)}
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>
                            {format(new Date(order.startDate), "MMM dd")} -{" "}
                            {format(new Date(order.endDate), "MMM dd, yyyy")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <span className="font-semibold text-sm text-foreground">
                        ${Number(order.totalAmount).toFixed(2)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="h-8 text-xs"
                      >
                        <Link href={`/customer-dashboard/orders/${order.id}`}>
                          Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3">
                  <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-base font-semibold mb-1">
                  No orders found
                </h3>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Your recent rental orders will appear here once placed.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Reviews Side Card */}
        <Card className="border border-border/60 shadow-sm">
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
                  className="p-3 rounded-lg border border-border/50 bg-card hover:bg-muted/20 transition-colors space-y-2"
                >
                  {review.gear && (
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-8 w-8 shrink-0 rounded overflow-hidden bg-muted border">
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
                        className="text-xs font-medium hover:underline line-clamp-1 flex items-center gap-1 text-foreground"
                      >
                        {review.gear.name}
                        <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
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

                  <p className="text-xs text-muted-foreground line-clamp-2">
                    &ldquo;{review.comment}&rdquo;
                  </p>

                  <p className="text-[10px] text-muted-foreground/70 text-right">
                    {format(new Date(review.createdAt), "MMM dd, yyyy")}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted mb-2">
                  <Star className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-xs font-medium text-muted-foreground">
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
