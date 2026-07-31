"use client";

import Link from "next/link";
import { ShoppingBag, Package } from "lucide-react";
import { useState, useEffect } from "react";

import { getMyOrders } from "@/service/dashboard/customer/getMyOrder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderRow } from "../../_component/OrderRow";

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
  pricePerDay: number;
  subtotal: number;
  rentalOrderId: string;
  gearItemId: string;
  gearItem: IGearItem;
}

export interface IOrder {
  id: string;
  customerId: string;
  startDate: string;
  endDate: string;
  status:
    | "PLACED"
    | "PAID"
    | "PICKED_UP"
    | "CANCELLED"
    | "CONFIRMED"
    | "RETURNED";

  totalAmount: string | number;
  createdAt: string;
  rentalOrderItems?: IRentalOrderItem[];
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

  console.log("______________>>>>>>>>>", orders);

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
