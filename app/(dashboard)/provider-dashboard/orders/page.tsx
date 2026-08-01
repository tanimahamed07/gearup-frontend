import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { ShoppingBag, Calendar, Clock, CheckCircle2, Tag } from "lucide-react";

import { getIncomingOrders } from "../../_action/getIncomingOrders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Data Type Definition
export interface IOrderItem {
  id: string;
  gearItemId: string;
  rentalOrderId: string;
  quantity: number;
  pricePerDay: string;
  subtotal: string;
  gearItem: {
    id: string;
    name: string;
    brand: string;
    image?: string;
  };
  rentalOrder: {
    id: string;
    startDate: string;
    endDate: string;
    status: string;
    totalAmount: string;
    customer: {
      name: string;
      email: string;
    };
  };
}

export default async function IncomingOrdersPage() {
  const result = await getIncomingOrders();
  const orders: IOrderItem[] = result?.data || [];
  console.log(orders);

  // Stats Calculation
  const totalOrders = orders.length;
  const activeOrders = orders.filter(
    (o) =>
      o.rentalOrder?.status === "PAID" || o.rentalOrder?.status === "APPROVED",
  ).length;
  const totalEarnings = orders.reduce(
    (acc, item) => acc + Number(item.subtotal || 0),
    0,
  );

  return (
    <div className="space-y-6 p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Incoming Rental Orders
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track and manage bookings placed for your rental gear items.
          </p>
        </div>
      </div>

      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Orders
            </CardTitle>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <ShoppingBag className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-foreground">
              {totalOrders}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              All-time rental requests
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Confirmed Bookings
            </CardTitle>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-foreground">
              {activeOrders}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Active/Paid rentals
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Earnings
            </CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <Tag className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-foreground">
              ${totalEarnings.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total value from items
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card className="border border-border/60 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              Recent Booking Orders ({orders.length})
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="w-72">Gear Item</TableHead>
                    <TableHead className="w-56">Customer</TableHead>
                    <TableHead className="w-56">Rental Period</TableHead>
                    <TableHead className="w-28">Quantity</TableHead>
                    <TableHead className="w-32">Total</TableHead>
                    <TableHead className="w-32 text-right">Order Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((item) => {
                    const startDate = item.rentalOrder?.startDate
                      ? format(
                          new Date(item.rentalOrder.startDate),
                          "MMM dd, yyyy",
                        )
                      : "N/A";
                    const endDate = item.rentalOrder?.endDate
                      ? format(
                          new Date(item.rentalOrder.endDate),
                          "MMM dd, yyyy",
                        )
                      : "N/A";

                    return (
                      <TableRow
                        key={item.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        {/* Gear Details */}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted border shrink-0">
                              <Image
                                src={item.gearItem?.image || "/placeholder.png"}
                                alt={item.gearItem?.name || "Gear"}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                            <div className="space-y-0.5 max-w-52">
                              <p className="font-semibold text-sm text-foreground line-clamp-1">
                                {item.gearItem?.name}
                              </p>
                              <p className="text-xs text-muted-foreground font-medium">
                                {item.gearItem?.brand} • ${item.pricePerDay}/day
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Customer Info */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                              {item.rentalOrder?.customer?.name?.[0] || "U"}
                            </div>
                            <div className="space-y-0.5">
                              <p className="font-semibold text-sm text-foreground line-clamp-1">
                                {item.rentalOrder?.customer?.name || "Customer"}
                              </p>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {item.rentalOrder?.customer?.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Rental Dates */}
                        <TableCell>
                          <div className="flex flex-col text-xs font-medium space-y-1">
                            <div className="flex items-center gap-1.5 text-foreground">
                              <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                              <span>{startDate}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-muted-foreground pl-5">
                              <span>to {endDate}</span>
                            </div>
                          </div>
                        </TableCell>

                        {/* Quantity */}
                        <TableCell>
                          <div className="flex items-center gap-1 font-semibold text-sm">
                            <span>{item.quantity}</span>
                            <span className="text-xs text-muted-foreground font-normal">
                              unit(s)
                            </span>
                          </div>
                        </TableCell>

                        {/* Subtotal */}
                        <TableCell>
                          <span className="font-bold text-sm text-foreground">
                            ${Number(item.subtotal).toFixed(2)}
                          </span>
                        </TableCell>

                        {/* Order Status */}
                        <TableCell className="text-right">
                          {item.rentalOrder?.status === "PAID" ? (
                            <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                              PAID
                            </Badge>
                          ) : item.rentalOrder?.status === "PENDING" ? (
                            <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30 font-medium">
                              <Clock className="w-3 h-3 mr-1" />
                              PENDING
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="font-medium">
                              {item.rentalOrder?.status || "UNKNOWN"}
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-1">
                No orders received yet
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                When customers book your gear items, their order details will
                show up right here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
