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
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
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
      <div className="flex items-center justify-center min-h-[60vh] p-4">
        <div className="text-center max-w-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mx-auto mb-4 shadow-inner">
            <Package className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-foreground">
            Failed to load provider dashboard
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Please try refreshing the page or check your account permissions.
          </p>
        </div>
      </div>
    );
  }

  const { myGearItems, incomingOrders } = dashboardData;

  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PAID":
      case "CONFIRMED":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
            {status}
          </Badge>
        );
      case "PICKED_UP":
        return (
          <Badge className="bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/30 whitespace-nowrap">
            Picked Up
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
            Provider Dashboard
            <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500/20" />
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Manage your inventory, monitor earnings, and view incoming rental
            requests.
          </p>
        </div>
      </div>

      {/* Main Content Layout with items-start for Height Alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Incoming Rental Orders */}
        <Card className="lg:col-span-2 border border-border/60 shadow-xs rounded-xl overflow-hidden bg-card h-fit">
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
                className="gap-1 text-xs font-medium hover:bg-muted"
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
                    className="flex flex-col sm:flex-row sm:items-start justify-between p-4 sm:px-6 gap-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted border border-border/60 shrink-0 shadow-2xs mt-0.5">
                        <Image
                          src={gearItem?.image || "/placeholder.png"}
                          alt={gearItem?.name || "Gear Item"}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="space-y-1.5 min-w-0">
                        {/* Order ID & Status Badge */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex items-center gap-1 min-w-0">
                            <span className="font-mono text-xs font-bold bg-muted px-2 py-0.5 rounded border border-border/60 text-foreground break-all">
                              #{rentalOrder.id}
                            </span>
                            <CopyButton value={rentalOrder.id} />
                          </div>
                          {getStatusBadge(rentalOrder.status)}
                        </div>

                        {/* Gear Name */}
                        <div className="font-bold text-sm text-foreground truncate max-w-[200px] sm:max-w-xs">
                          {gearItem?.name}
                        </div>

                        {/* Customer Info & Dates */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground font-medium">
                          <span className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5 text-muted-foreground" />
                            {rentalOrder.customer?.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            {format(new Date(rentalOrder.startDate), "MMM dd")}{" "}
                            -{" "}
                            {format(
                              new Date(rentalOrder.endDate),
                              "MMM dd, yyyy",
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Subtotal only (Details button removed) */}
                    <div className="flex items-center justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-border/30 sm:mt-1.5">
                      <span className="font-extrabold text-sm text-foreground">
                        ${Number(orderItem.subtotal).toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3 shadow-inner">
                  <Clock className="h-7 w-7" />
                </div>
                <h3 className="text-base font-bold mb-1">No incoming orders</h3>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Active and upcoming rental orders for your gear will show up
                  here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* My Gear Listings Side Card */}
        <Card className="border border-border/60 shadow-xs rounded-xl overflow-hidden bg-card h-fit">
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
                className="gap-1 text-xs font-medium hover:bg-muted"
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
                  className="p-3.5 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/50 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative h-9 w-9 shrink-0 rounded-md overflow-hidden bg-background border shadow-2xs">
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
                        className="text-xs font-bold hover:underline line-clamp-1 text-foreground hover:text-primary transition-colors"
                      >
                        {gear.name}
                      </Link>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium mt-0.5">
                        <span>${Number(gear.pricePerDay).toFixed(2)}/day</span>
                        <span>•</span>
                        <span>Stock: {gear.stock}</span>
                      </div>
                    </div>
                  </div>

                  {/* Colorful Active / Unavailable Badges */}
                  <Badge
                    className={`text-[10px] px-2 py-0.5 shrink-0 font-semibold ${
                      gear.isAvailable
                        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
                        : "bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-500/30"
                    }`}
                  >
                    {gear.isAvailable ? "Active" : "Unavailable"}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted mb-3">
                  <Package className="h-6 w-6 text-muted-foreground/60" />
                </div>
                <p className="text-xs font-semibold text-muted-foreground">
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
