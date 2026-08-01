"use client";

import { createCheckoutSession } from "@/service/dashboard/customer/payment";
import Link from "next/link";
import { format } from "date-fns";
import {
  CreditCard,
  ChevronDown,
  ExternalLink,
  Loader2,
  Calendar,
  Clock,
  ArrowRight,
  Package,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { IOrder } from "../customer-dashboard/orders/page";
import { CopyButton } from "@/components/ui/copy-button";

export function OrderRow({ order }: { order: IOrder }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const totalItemsCount =
    order.rentalOrderItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const rentalDays = calculateDuration(order.startDate, order.endDate);

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
          <Badge className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border border-emerald-500/30 dark:text-emerald-400 whitespace-nowrap">
            Confirmed
          </Badge>
        );
      case "PAID":
        return (
          <Badge className="bg-blue-500/15 text-blue-700 hover:bg-blue-500/25 border border-blue-500/30 dark:text-blue-400 whitespace-nowrap">
            Paid
          </Badge>
        );
      case "PLACED":
        return (
          <Badge className="bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 border border-amber-500/30 dark:text-amber-400 whitespace-nowrap">
            Placed
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge className="bg-red-500/15 text-red-700 border border-red-500/30 dark:text-red-400 whitespace-nowrap">
            Cancelled
          </Badge>
        );
      case "PICKED_UP":
        return (
          <Badge className="bg-purple-500/15 text-purple-700 border border-purple-500/30 dark:text-purple-400 whitespace-nowrap">
            Picked Up
          </Badge>
        );
      case "RETURNED":
        return (
          <Badge className="bg-gray-500/15 text-gray-700 border border-gray-500/30 dark:text-gray-400 whitespace-nowrap">
            Returned
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

  // Payment Status Badge
  const getPaymentStatusBadge = (status?: string) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border border-emerald-500/30 dark:text-emerald-400 whitespace-nowrap">
            Completed
          </Badge>
        );
      case "FAILED":
        return (
          <Badge className="bg-red-500/15 text-red-700 border border-red-500/30 dark:text-red-400 whitespace-nowrap">
            Failed
          </Badge>
        );
      case "PENDING":
      default:
        return (
          <Badge className="bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 border border-amber-500/30 dark:text-amber-400 whitespace-nowrap">
            Pending
          </Badge>
        );
    }
  };

  return (
    <>
      {/* Main Order Row */}
      <TableRow
        className={`hover:bg-muted/40 transition-colors ${isExpanded ? "bg-muted/30 border-b-0" : ""}`}
      >
        {/* Expand/Collapse Icon */}
        <TableCell className="w-10 pl-4">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-full hover:bg-primary/10 hover:text-primary transition-all"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                isExpanded ? "rotate-180 text-primary" : "text-muted-foreground"
              }`}
            />
            <span className="sr-only">Toggle items</span>
          </Button>
        </TableCell>

        {/* Full Order ID with Copy Button */}
        <TableCell className="whitespace-nowrap">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-muted border border-border/80 text-foreground break-all">
                {order.id}
              </span>
              <CopyButton value={order.id} />
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>
                {format(new Date(order.createdAt), "MMM dd, yyyy - hh:mm a")}
              </span>
            </div>
          </div>
        </TableCell>

        {/* Rental Period */}
        <TableCell className="whitespace-nowrap">
          <div className="flex flex-col space-y-0.5">
            <span className="text-xs font-semibold flex items-center gap-1 text-foreground">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              {format(new Date(order.startDate), "MMM dd")}{" "}
              <ArrowRight className="h-3 w-3 text-muted-foreground" />{" "}
              {format(new Date(order.endDate), "MMM dd, yyyy")}
            </span>
            <span className="text-[11px] text-muted-foreground pl-4.5">
              Duration:{" "}
              <strong className="text-foreground font-semibold">
                {rentalDays}
              </strong>{" "}
              {rentalDays === 1 ? "day" : "days"}
            </span>
          </div>
        </TableCell>

        {/* Items Count */}
        <TableCell className="text-center whitespace-nowrap">
          <Badge
            variant="secondary"
            className="font-bold px-2.5 py-0.5 text-xs"
          >
            {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"}
          </Badge>
        </TableCell>

        {/* Total Amount */}
        <TableCell className="whitespace-nowrap">
          <span className="text-sm font-extrabold text-foreground tracking-tight">
            ${Number(order.totalAmount).toFixed(2)}
          </span>
        </TableCell>

        {/* Order Status Column */}
        <TableCell className="whitespace-nowrap">
          {getOrderStatusBadge(order.status)}
        </TableCell>

        {/* Payment Status Column */}
        <TableCell className="whitespace-nowrap">
          {getPaymentStatusBadge(order.payment?.status)}
        </TableCell>

        {/* Actions */}
        <TableCell className="text-right whitespace-nowrap pr-6">
          {order.status === "PLACED" ? (
            <Button
              size="sm"
              className="gap-2 shadow-sm font-semibold hover:shadow transition-all bg-primary hover:bg-primary/90"
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
            <Button
              size="sm"
              variant="outline"
              asChild
              className="gap-1.5 hover:bg-primary hover:text-primary-foreground"
            >
              <Link href={`/customer-dashboard/orders/${order.id}`}>
                Details <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
        </TableCell>
      </TableRow>

      {/* Expanded Order Items Accordion Box */}
      {isExpanded && (
        <TableRow className="bg-muted/15 border-b border-border/60 hover:bg-muted/15">
          <TableCell colSpan={8} className="p-4 md:p-6">
            <div className="bg-card rounded-xl border border-border/80 p-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-3">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" />
                  Rented Gear Items ({order.rentalOrderItems?.length || 0})
                </h4>
                <span className="text-xs text-muted-foreground">
                  Click gear item to view full info
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {order.rentalOrderItems?.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/60 border border-border/40 transition-colors"
                  >
                    {/* Item Image & Title */}
                    <div className="flex items-center gap-3 min-w-0">
                      <Link
                        href={`/gears/${item.gearItemId}`}
                        target="_blank"
                        className="relative h-14 w-14 shrink-0 rounded-lg overflow-hidden bg-background border shadow-xs group"
                      >
                        <Image
                          src={item.gearItem.image}
                          alt={item.gearItem.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          unoptimized
                        />
                      </Link>

                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/gears/${item.gearItemId}`}
                          target="_blank"
                          className="font-bold text-sm hover:underline inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors truncate max-w-full"
                        >
                          <span className="truncate">{item.gearItem.name}</span>
                          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        </Link>
                        <p className="text-xs text-muted-foreground font-medium mt-0.5">
                          Brand:{" "}
                          <span className="text-foreground">
                            {item.gearItem.brand}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Breakdown details */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-2 sm:pt-0 border-border/40 text-xs">
                      {/* Quantity */}
                      <div className="text-left sm:text-center">
                        <p className="text-[10px] text-muted-foreground font-medium uppercase">
                          Qty
                        </p>
                        <p className="text-sm font-bold text-foreground">
                          {item.quantity}
                        </p>
                      </div>

                      {/* Price per Day */}
                      <div className="text-left sm:text-center">
                        <p className="text-[10px] text-muted-foreground font-medium uppercase">
                          Rate/Day
                        </p>
                        <p className="text-sm font-bold text-foreground">
                          ${Number(item.pricePerDay).toFixed(2)}
                        </p>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right">
                        <p className="text-[10px] text-muted-foreground font-medium uppercase">
                          Subtotal
                        </p>
                        <p className="text-sm font-extrabold text-primary">
                          ${Number(item.subtotal).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
