import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  ShoppingBag,
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  XCircle,
  RotateCcw,
} from "lucide-react";

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
import { StatusSelect } from "../../_component/StatusSelect";
import { CopyButton } from "@/components/ui/copy-button";

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

  // Status Badge Helper Matching Manage Inventory Style
  const getOrderStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED":
      case "PAID":
        return (
          <Badge className="gap-1 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30 whitespace-nowrap">
            <CheckCircle2 className="h-3 w-3" /> {status}
          </Badge>
        );
      case "PICKED_UP":
        return (
          <Badge className="gap-1 bg-purple-500/15 text-purple-700 dark:text-purple-400 hover:bg-purple-500/25 border border-purple-500/30 whitespace-nowrap">
            <Clock className="h-3 w-3" /> Picked Up
          </Badge>
        );
      case "RETURNED":
        return (
          <Badge className="gap-1 bg-blue-500/15 text-blue-700 dark:text-blue-400 hover:bg-blue-500/25 border border-blue-500/30 whitespace-nowrap">
            <RotateCcw className="h-3 w-3" /> Returned
          </Badge>
        );
      case "CANCELLED":
      case "FAILED":
        return (
          <Badge className="gap-1 bg-red-500/15 text-red-700 dark:text-red-400 hover:bg-red-500/25 border border-red-500/30 whitespace-nowrap">
            <XCircle className="h-3 w-3" /> {status}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="whitespace-nowrap">
            {status || "PLACED"}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            Incoming Rental Orders
            <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500/20" />
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Track and manage bookings placed for your rental gear items
          </p>
        </div>
      </div>

      {/* Main Orders Table Card */}
      <Card className="border border-border/60 shadow-sm rounded-xl overflow-hidden bg-card">
        <CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Recent Booking Orders ({orders.length})
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {orders.length > 0 ? (
            /* Overflow wrapper for smooth mobile horizontal scrolling */
            <div className="overflow-x-auto">
              <Table className="min-w-[900px]">
                <TableHeader className="bg-muted/40">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[280px] whitespace-nowrap pl-6">
                      Gear Item
                    </TableHead>
                    <TableHead className="w-[220px] whitespace-nowrap">
                      Customer
                    </TableHead>
                    <TableHead className="w-[180px] whitespace-nowrap">
                      Rental Period
                    </TableHead>
                    <TableHead className="w-[100px] whitespace-nowrap">
                      Qty
                    </TableHead>
                    <TableHead className="w-[120px] whitespace-nowrap">
                      Total
                    </TableHead>
                    <TableHead className="w-[140px] whitespace-nowrap">
                      Order Status
                    </TableHead>
                    <TableHead className="text-right whitespace-nowrap pr-6 w-[160px]">
                      Update Status
                    </TableHead>
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
                        className="hover:bg-muted/40 transition-colors"
                      >
                        {/* Gear Details */}
                        <TableCell className="whitespace-nowrap pl-6">
                          <div className="flex items-center gap-3">
                            <div className="relative h-11 w-11 rounded-lg overflow-hidden bg-muted border border-border/80 shrink-0">
                              <Image
                                src={item.gearItem?.image || "/placeholder.png"}
                                alt={item.gearItem?.name || "Gear"}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                            <div className="space-y-0.5 max-w-[180px] sm:max-w-xs">
                              <p className="font-bold text-sm text-foreground line-clamp-1">
                                {item.gearItem?.name}
                              </p>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                                <span>{item.gearItem?.brand}</span>
                                <span>•</span>
                                <span className="font-semibold text-foreground">
                                  ${Number(item.pricePerDay).toFixed(2)}/day
                                </span>
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        {/* Customer Info */}
                        <TableCell className="whitespace-nowrap">
                          <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-extrabold text-xs shrink-0 border border-primary/20">
                              {item.rentalOrder?.customer?.name?.[0] || "U"}
                            </div>
                            <div className="space-y-0.5 max-w-[160px]">
                              <p className="font-bold text-sm text-foreground line-clamp-1">
                                {item.rentalOrder?.customer?.name || "Customer"}
                              </p>
                              <p className="text-xs text-muted-foreground font-medium line-clamp-1">
                                {item.rentalOrder?.customer?.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Rental Dates */}
                        <TableCell className="whitespace-nowrap">
                          <div className="flex flex-col text-xs font-semibold space-y-0.5">
                            <div className="flex items-center gap-1.5 text-foreground">
                              <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                              <span>{startDate}</span>
                            </div>
                            <span className="text-[11px] text-muted-foreground pl-5 font-medium">
                              to {endDate}
                            </span>
                          </div>
                        </TableCell>

                        {/* Quantity */}
                        <TableCell className="whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-extrabold text-foreground">
                              {item.quantity}
                            </span>
                            <span className="text-xs text-muted-foreground font-medium">
                              unit(s)
                            </span>
                          </div>
                        </TableCell>

                        {/* Subtotal */}
                        <TableCell className="whitespace-nowrap">
                          <span className="text-sm font-extrabold text-foreground tracking-tight">
                            ${Number(item.subtotal).toFixed(2)}
                          </span>
                        </TableCell>

                        {/* Order Status Badge */}
                        <TableCell className="whitespace-nowrap">
                          {getOrderStatusBadge(item.rentalOrder?.status)}
                        </TableCell>

                        {/* Update Status Dropdown */}
                        <TableCell className="text-right whitespace-nowrap pr-6">
                          <StatusSelect
                            orderId={item.rentalOrderId}
                            currentStatus={item.rentalOrder?.status || "PLACED"}
                          />
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
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 shadow-inner">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-1">No orders received yet</h3>
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
