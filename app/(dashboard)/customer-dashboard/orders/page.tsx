"use client";

import Link from "next/link";
import { format } from "date-fns";
import {
  CreditCard,
  ShoppingBag,
  ChevronDown,
  Package,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

import { getMyOrders } from "@/service/dashboard/customer/getMyOrder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Interface definitions
export interface IGearItem {
  id: string;
  name: string;
  brand: string;
  image: string;
  description: string;
  pricePerDay: number;
}

export interface IRentalOrderItem {
  id: string;
  quantity: number;
  pricePerDay: string | number;
  subtotal: string | number;
  rentalOrderId: string;
  gearItemId: string;
  gearItem: IGearItem;
}

export interface IOrder {
  id: string;
  customerId: string;
  startDate: string;
  endDate: string;
  status: "PLACED" | "PAID" | "COMPLETED" | "CANCELLED" | string;
  totalAmount: string | number;
  createdAt: string;
  rentalOrderItems?: IRentalOrderItem[];
}

// Order Row Component
function OrderRow({ order }: { order: IOrder }) {
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

  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PAID":
        return (
          <Badge className="bg-blue-500/15 text-blue-700 hover:bg-blue-500/25 border-blue-500/30 dark:text-blue-400">
            Paid
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border-emerald-500/30 dark:text-emerald-400">
            Completed
          </Badge>
        );
      case "PLACED":
      case "PENDING":
        return (
          <Badge className="bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 border-amber-500/30 dark:text-amber-400">
            Pending
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge className="bg-red-500/15 text-red-700 border-red-500/30 dark:text-red-400">
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
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

        {/* Status */}
        <TableCell>{getStatusBadge(order.status)}</TableCell>

        {/* Actions */}
        <TableCell className="text-right">
          {order.status === "PLACED" ? (
            <Button size="sm" className="gap-2" asChild>
              <Link href={`/customer-dashboard/orders/${order.id}`}>
                <CreditCard className="h-3.5 w-3.5" /> Pay Now
              </Link>
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
          <TableCell colSpan={7} className="p-0">
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
                        className="relative h-14 w-14 flex-shrink-0 rounded-md overflow-hidden bg-muted group"
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
                          <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
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

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const result = await getMyOrders();
        setOrders(result?.data || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            My Orders
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your rental orders and manage payments
          </p>
        </div>
        <Button asChild className="gap-2 shadow-sm">
          <Link href="/gears">
            <ShoppingBag className="h-4 w-4" /> Browse Gear
          </Link>
        </Button>
      </div>

      {/* Orders Table */}
      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              All Orders ({orders.length})
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead className="w-40">Order ID</TableHead>
                    <TableHead className="w-56">Rental Period</TableHead>
                    <TableHead className="w-28 text-center">Items</TableHead>
                    <TableHead className="w-32">Total</TableHead>
                    <TableHead className="w-32">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <OrderRow key={order.id} order={order} />
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm mb-6">
                You haven&apos;t placed any rental orders yet. Browse our gear
                collection to start your adventure!
              </p>
              <Button asChild size="lg" className="gap-2">
                <Link href="/gears">
                  <ShoppingBag className="h-4 w-4" /> Browse Gear
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
