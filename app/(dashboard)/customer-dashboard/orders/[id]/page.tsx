import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  ExternalLink,
  Package,
  Receipt,
  ShoppingBag,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

import { getRentalOrdersDetails } from "@/service/dashboard/customer/getRentalOrderDetails";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/ui/copy-button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const res = await getRentalOrdersDetails(id);
  const order = res?.data || null;

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Package className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The rental order details you are looking for do not exist or have been
          removed.
        </p>
        <Button asChild>
          <Link href="/customer-dashboard/orders">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
          </Link>
        </Button>
      </div>
    );
  }

  // Calculate rental duration in days
  const startDate = order.startDate ? new Date(order.startDate) : new Date();
  const endDate = order.endDate ? new Date(order.endDate) : new Date();

  const rentalDays =
    Math.ceil(
      Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    ) || 1;

  // Order Status Badge Logic
  const getOrderStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 px-3 py-1 font-medium">
            Confirmed
          </Badge>
        );
      case "PAID":
        return (
          <Badge className="bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30 px-3 py-1 font-medium">
            Paid
          </Badge>
        );
      case "PICKED_UP":
        return (
          <Badge className="bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30 px-3 py-1 font-medium">
            Picked Up
          </Badge>
        );
      case "RETURNED":
        return (
          <Badge className="bg-gray-500/15 text-gray-700 dark:text-gray-400 border-gray-500/30 px-3 py-1 font-medium">
            Returned
          </Badge>
        );
      case "PLACED":
        return (
          <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30 px-3 py-1 font-medium">
            Placed
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge className="bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30 px-3 py-1 font-medium">
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Payment Status Element Logic
  const getPaymentStatusDisplay = (status?: string) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
        return (
          <span className="font-semibold text-xs flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Paid
          </span>
        );
      case "FAILED":
        return (
          <span className="font-semibold text-xs flex items-center gap-1 text-red-600 dark:text-red-400">
            <XCircle className="h-3.5 w-3.5" />
            Failed
          </span>
        );
      case "PENDING":
      default:
        return (
          <span className="font-semibold text-xs flex items-center gap-1 text-amber-600 dark:text-amber-400">
            <Clock className="h-3.5 w-3.5" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4 sm:p-6">
      {/* Top Navigation & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="ghost" size="sm" asChild className="w-fit">
          <Link href="/customer-dashboard/orders">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
          </Link>
        </Button>

        <Button variant="outline" size="sm" asChild className="gap-2 w-fit">
          <Link href="/gears">
            <ShoppingBag className="h-4 w-4" /> Rent More Gear
          </Link>
        </Button>
      </div>

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            {/* Full Order ID Display with Copy Button */}
            <div className="flex items-center gap-1 bg-muted/50 border border-border/60 px-3 py-1 rounded-lg">
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight font-mono text-foreground">
                Order #{order.id}
              </h1>
              <CopyButton value={order.id} />
            </div>

            {getOrderStatusBadge(order.status)}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Placed on{" "}
            {order.createdAt
              ? format(new Date(order.createdAt), "MMMM dd, yyyy - hh:mm a")
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Rented Gear Items */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="bg-muted/20 border-b border-border/40 py-4">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Rented Items ({order.rentalOrderItems?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {order.rentalOrderItems && order.rentalOrderItems.length > 0 ? (
                order.rentalOrderItems.map((item: any) => {
                  const gearName =
                    item.gearItem?.name || item.gear?.name || "Gear Item";
                  const gearImage =
                    item.gearItem?.image ||
                    item.gear?.image ||
                    item.gearItem?.images?.[0] ||
                    "/placeholder.png";
                  const gearBrand =
                    item.gearItem?.brand || item.gear?.brand || "Generic";
                  const pricePerDay = Number(
                    item.pricePerDay || item.price || 0,
                  );
                  const itemQuantity = item.quantity || 1;
                  const itemSubtotal = item.subtotal
                    ? Number(item.subtotal)
                    : pricePerDay * itemQuantity * rentalDays;

                  return (
                    <div
                      key={item.id || item.gearItemId}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-muted/20 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {/* Item Image */}
                        <div className="relative h-16 w-16 shrink-0 rounded-md overflow-hidden bg-muted border border-border/40">
                          <Image
                            src={gearImage}
                            alt={gearName}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>

                        {/* Item Details */}
                        <div>
                          <Link
                            href={`/gears/${item.gearItemId || item.gearId}`}
                            target="_blank"
                            className="font-semibold text-base hover:underline inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
                          >
                            {gearName}
                            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                          </Link>
                          <p className="text-xs text-muted-foreground">
                            Brand: {gearBrand}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            ${pricePerDay.toFixed(2)} / day × {rentalDays}{" "}
                            {rentalDays === 1 ? "day" : "days"}
                          </p>
                        </div>
                      </div>

                      {/* Pricing Breakdown per Item */}
                      <div className="flex sm:flex-col justify-between items-end border-t sm:border-t-0 pt-2 sm:pt-0 border-border/40">
                        <span className="text-xs text-muted-foreground">
                          Qty:{" "}
                          <span className="font-semibold text-foreground">
                            {itemQuantity}
                          </span>
                        </span>
                        <span className="text-sm font-bold text-primary">
                          ${itemSubtotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No items found in this order.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Order Summary & Rental Period */}
        <div className="space-y-6">
          {/* Rental Duration Summary */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="bg-muted/20 border-b border-border/40 py-4">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Rental Period
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Start Date:</span>
                <span className="font-semibold">
                  {format(startDate, "MMM dd, yyyy")}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">End Date:</span>
                <span className="font-semibold">
                  {format(endDate, "MMM dd, yyyy")}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between items-center font-medium">
                <span className="text-muted-foreground">Total Duration:</span>
                <Badge variant="secondary" className="font-bold">
                  {rentalDays} {rentalDays === 1 ? "Day" : "Days"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Payment & Price Breakdown */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="bg-muted/20 border-b border-border/40 py-4">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Receipt className="h-5 w-5 text-primary" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3 text-sm">
              {order.payment && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status:</span>
                    {getPaymentStatusDisplay(order.payment.status)}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Method:</span>
                    <span className="font-semibold uppercase flex items-center gap-1 text-xs">
                      <CreditCard className="h-3.5 w-3.5 text-primary" />{" "}
                      {order.payment.method || "CARD"}
                    </span>
                  </div>

                  {order.payment.transactionId && (
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-muted-foreground shrink-0">
                        Transaction ID:
                      </span>
                      <div className="flex items-center gap-1 overflow-hidden">
                        <span
                          title={order.payment.transactionId}
                          className="font-mono text-xs font-semibold bg-muted px-2 py-0.5 rounded border truncate"
                        >
                          {order.payment.transactionId}
                        </span>
                        <CopyButton value={order.payment.transactionId} />
                      </div>
                    </div>
                  )}

                  {order.payment.paidAt && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Paid At:</span>
                      <span className="font-medium text-muted-foreground">
                        {format(
                          new Date(order.payment.paidAt),
                          "MMM dd, hh:mm a",
                        )}
                      </span>
                    </div>
                  )}

                  <Separator />
                </>
              )}

              <div className="flex justify-between items-center text-base font-bold pt-1">
                <span>Total Amount:</span>
                <span className="text-emerald-600 dark:text-emerald-400 text-lg">
                  $
                  {Number(
                    order.totalAmount || order.payment?.amount || 0,
                  ).toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
