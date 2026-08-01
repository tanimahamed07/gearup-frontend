"use client";

import { createCheckoutSession } from "@/service/dashboard/customer/payment";
import Link from "next/link";
import { format } from "date-fns";
import { CreditCard, ChevronDown, ExternalLink, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { IOrder } from "../customer-dashboard/orders/page";

// Order Row Component
export function OrderRow({ order }: { order: IOrder }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalItemsCount =
    order.rentalOrderItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const rentalDays = calculateDuration(order.startDate, order.endDate);

  const [isPaying, setIsPaying] = useState(false);

  // Pay Now Handle Function
  const handlePayment = async () => {
    try {
      setIsPaying(true);
      const res = await createCheckoutSession(order.id);

      if (res?.success && res?.data?.paymentUrl) {
        window.location.href = res.data.paymentUrl;
      } else {
        alert(res?.message || "Payment session create করতে ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    } finally {
      setIsPaying(false);
    }
  };

  // Order Status Badge
  const getOrderStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border-emerald-500/30 dark:text-emerald-400">
            Confirmed
          </Badge>
        );
      case "PAID":
        return (
          <Badge className="bg-blue-500/15 text-blue-700 hover:bg-blue-500/25 border-blue-500/30 dark:text-blue-400">
            Paid
          </Badge>
        );
      case "PLACED":
        return (
          <Badge className="bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 border-amber-500/30 dark:text-amber-400">
            Placed
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge className="bg-red-500/15 text-red-700 border-red-500/30 dark:text-red-400">
            Cancelled
          </Badge>
        );
      case "PICKED_UP":
        return (
          <Badge className="bg-purple-500/15 text-purple-700 border-purple-500/30 dark:text-purple-400">
            Picked Up
          </Badge>
        );
      case "RETURNED":
        return (
          <Badge className="bg-gray-500/15 text-gray-700 border-gray-500/30 dark:text-gray-400">
            Returned
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Payment Status Badge (COMPLETED হলে Paid ব্যাজ দেখাবে)
  const getPaymentStatusBadge = (status?: string) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border-emerald-500/30 dark:text-emerald-400">
            Paid
          </Badge>
        );
      case "FAILED":
        return (
          <Badge className="bg-red-500/15 text-red-700 border-red-500/30 dark:text-red-400">
            Failed
          </Badge>
        );
      case "PENDING":
      default:
        return (
          <Badge className="bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 border-amber-500/30 dark:text-amber-400">
            Pending
          </Badge>
        );
    }
  };

  return (
    <>
      {/* Main Order Row */}
      <TableRow className="hover:bg-muted/50 transition-colors">
        {/* Expand/Collapse Icon */}
        <TableCell className="w-12">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
            <span className="sr-only">Toggle items</span>
          </Button>
        </TableCell>

        {/* Order ID */}
        <TableCell>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-semibold">
              #{order.id.slice(0, 10)}
            </span>
            <span className="text-xs text-muted-foreground">
              {format(new Date(order.createdAt), "MMM dd, yyyy")}
            </span>
          </div>
        </TableCell>

        {/* Rental Period */}
        <TableCell>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {format(new Date(order.startDate), "MMM dd")} -{" "}
              {format(new Date(order.endDate), "MMM dd, yyyy")}
            </span>
            <span className="text-xs text-muted-foreground">
              {rentalDays} {rentalDays === 1 ? "day" : "days"}
            </span>
          </div>
        </TableCell>

        {/* Items Count */}
        <TableCell className="text-center">
          <Badge variant="secondary" className="font-semibold">
            {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"}
          </Badge>
        </TableCell>

        {/* Total Amount */}
        <TableCell>
          <span className="text-sm font-bold">
            ${Number(order.totalAmount).toFixed(2)}
          </span>
        </TableCell>

        {/* Order Status Column */}
        <TableCell>{getOrderStatusBadge(order.status)}</TableCell>

        {/* Payment Status Column */}
        <TableCell>{getPaymentStatusBadge(order.payment?.status)}</TableCell>

        {/* Actions */}
        <TableCell className="text-right">
          {order.status === "PLACED" ? (
            <Button
              size="sm"
              className="gap-2"
              onClick={handlePayment}
              disabled={isPaying}
            >
              {isPaying ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <CreditCard className="h-3.5 w-3.5" />
              )}
              {isPaying ? "Processing..." : "Pay Now"}
            </Button>
          ) : (
            <Button size="sm" variant="ghost" asChild>
              <Link href={`/customer-dashboard/orders/${order.id}`}>
                Details
              </Link>
            </Button>
          )}
        </TableCell>
      </TableRow>

      {/* Expanded Order Items */}
      {isExpanded && (
        <TableRow className="hover:bg-transparent">
          <TableCell colSpan={8} className="p-0">
            <div className="bg-muted/30 border-t border-border/40">
              <div className="px-4 py-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Order Items
                </h4>
                <div className="space-y-2">
                  {order.rentalOrderItems?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border/40"
                    >
                      {/* Item Image with Link */}
                      <Link
                        href={`/gears/${item.gearItemId}`}
                        target="_blank"
                        className="relative h-14 w-14 shrink-0 rounded-md overflow-hidden bg-muted group"
                      >
                        <Image
                          src={item.gearItem.image}
                          alt={item.gearItem.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          unoptimized
                        />
                      </Link>

                      {/* Item Details with Link */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/gears/${item.gearItemId}`}
                          target="_blank"
                          className="font-semibold text-sm hover:underline inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors truncate max-w-full"
                        >
                          <span className="truncate">{item.gearItem.name}</span>
                          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        </Link>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.gearItem.brand}
                        </p>
                      </div>

                      {/* Quantity */}
                      <div className="text-center px-3">
                        <p className="text-xs text-muted-foreground">Qty</p>
                        <p className="text-sm font-semibold">{item.quantity}</p>
                      </div>

                      {/* Price per Day */}
                      <div className="text-center px-3">
                        <p className="text-xs text-muted-foreground">
                          Price/Day
                        </p>
                        <p className="text-sm font-semibold">
                          ${Number(item.pricePerDay).toFixed(2)}
                        </p>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right px-3">
                        <p className="text-xs text-muted-foreground">
                          Subtotal
                        </p>
                        <p className="text-sm font-bold text-primary">
                          ${Number(item.subtotal).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
