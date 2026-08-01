import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import {
  Package,
  Clock,
  DollarSign,
  Star,
  Plus,
  Calendar,
  ChevronRight,
  User,
  Layers,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { dashboardOverview } from "../_action/dashboardOverview";

export interface IProviderStats {
  totalGearItems: number;
  totalEarnings: string | number;
  activeRentals: number;
  totalReviews: number;
}

export interface IGearItemOverview {
  id: string;
  name: string;
  image?: string | null;
  pricePerDay: string | number;
  stock: number;
  isAvailable: boolean;
  createdAt: string | Date;
  category?: {
    name: string;
  };
  _count?: {
    reviews: number;
    rentalOrderItems: number;
  };
}

export interface IIncomingOrder {
  id: string;
  subtotal: string | number;
  gearItem: {
    id: string;
    name: string;
    image?: string | null;
  };
  rentalOrder: {
    id: string;
    startDate: string | Date;
    endDate: string | Date;
    status: string;
    customer: {
      id: string;
      name: string;
      email: string;
      phone?: string | null;
    };
  };
}

export interface IProviderDashboardData {
  stats: IProviderStats;
  myGearItems: IGearItemOverview[];
  incomingOrders: IIncomingOrder[];
}

export default async function ProviderOverviewPage() {
  const res = await dashboardOverview();
  const dashboardData: IProviderDashboardData | null = res?.data || null;

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mx-auto mb-3">
            <Package className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold">
            Failed to load provider dashboard
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Please try refreshing the page or check your account permissions.
          </p>
        </div>
      </div>
    );
  }

  const { stats, myGearItems, incomingOrders } = dashboardData;

  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PAID":
      case "CONFIRMED":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20">
            {status}
          </Badge>
        );
      case "PICKED_UP":
        return (
          <Badge className="bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30 hover:bg-blue-500/20">
            Picked Up
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Provider Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your inventory, monitor earnings, and view incoming rental
            requests.
          </p>
        </div>
        <Button asChild className="gap-2 shadow-sm">
          <Link href="/provider-dashboard/inventory">
            <Plus className="h-4 w-4" /> Add New Gear
          </Link>
        </Button>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Earnings
            </CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${Number(stats?.totalEarnings || 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Lifetime revenue from rentals
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Gear Inventory
            </CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats?.totalGearItems || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Active gear listings
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
              Currently rented items
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Gear Reviews
            </CardTitle>
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats?.totalReviews || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Customer feedback received
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incoming Rental Orders */}
        <Card className="lg:col-span-2 border border-border/60 shadow-sm">
          <CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Incoming Rentals
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="gap-1 text-xs font-normal"
              >
                <Link href="/provider-dashboard/orders">
                  View All <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 divide-y divide-border/40">
            {incomingOrders && incomingOrders.length > 0 ? (
              incomingOrders.map((orderItem) => {
                const { gearItem, rentalOrder } = orderItem;

                return (
                  <div
                    key={orderItem.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:px-6 gap-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-md overflow-hidden bg-muted border shrink-0">
                        <Image
                          src={gearItem?.image || "/placeholder.png"}
                          alt={gearItem?.name || "Gear Item"}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-foreground line-clamp-1">
                            {gearItem?.name}
                          </span>
                          {getStatusBadge(rentalOrder.status)}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {rentalOrder.customer?.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(
                              new Date(rentalOrder.startDate),
                              "MMM dd",
                            )}{" "}
                            -{" "}
                            {format(
                              new Date(rentalOrder.endDate),
                              "MMM dd, yyyy",
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <span className="font-semibold text-sm text-foreground">
                        ${Number(orderItem.subtotal).toFixed(2)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="h-8 text-xs"
                      >
                        <Link
                          href={`/provider-dashboard/orders/${rentalOrder.id}`}
                        >
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
                  <Clock className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-base font-semibold mb-1">
                  No incoming orders
                </h3>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Active and upcoming rental orders for your gear will show up
                  here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* My Gear Listings Side Card */}
        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Recent Gear
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="gap-1 text-xs font-normal"
              >
                <Link href="/provider-dashboard/gears">
                  Manage <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-4 space-y-3">
            {myGearItems && myGearItems.length > 0 ? (
              myGearItems.slice(0, 5).map((gear) => (
                <div
                  key={gear.id}
                  className="p-3 rounded-lg border border-border/50 bg-card hover:bg-muted/20 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative h-9 w-9 shrink-0 rounded overflow-hidden bg-muted border">
                      <Image
                        src={gear.image || "/placeholder.png"}
                        alt={gear.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/gears/${gear.id}`}
                        className="text-xs font-medium hover:underline line-clamp-1 text-foreground"
                      >
                        {gear.name}
                      </Link>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                        <span>${Number(gear.pricePerDay).toFixed(2)}/day</span>
                        <span>•</span>
                        <span>Stock: {gear.stock}</span>
                      </div>
                    </div>
                  </div>

                  <Badge
                    variant={gear.isAvailable ? "outline" : "secondary"}
                    className="text-[10px] px-1.5 py-0.5 shrink-0"
                  >
                    {gear.isAvailable ? "Active" : "Unavailable"}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted mb-2">
                  <Package className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-xs font-medium text-muted-foreground">
                  No gear listed yet
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
