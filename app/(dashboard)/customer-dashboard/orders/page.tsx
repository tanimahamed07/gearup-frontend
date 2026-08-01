"use client";

import Link from "next/link";
import { ShoppingBag, Package, Sparkles } from "lucide-react";
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
import Loading from "@/app/loading";

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
  payment: {
    status: "PENDING" | "COMPLETED" | "FAILED";
  };
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

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            My Orders
            <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500/20" />
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Track your gear rentals, view order details & handle payments
          </p>
        </div>
        <Button
          asChild
          className="gap-2 shadow-md hover:shadow-lg transition-all"
        >
          <Link href="/gears">
            <ShoppingBag className="h-4 w-4" /> Browse Gear
          </Link>
        </Button>
      </div>

      {/* Orders Table Card */}
      <Card className="border border-border/60 shadow-sm rounded-xl overflow-hidden bg-card">
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
            /* Table Component without outer extra wrapper */
            <Table className="min-w-[900px]">
              <TableHeader className="bg-muted/40">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-10 whitespace-nowrap"></TableHead>
                  <TableHead className="w-72 whitespace-nowrap">
                    Order ID & Date
                  </TableHead>
                  <TableHead className="w-52 whitespace-nowrap">
                    Rental Period
                  </TableHead>
                  <TableHead className="w-24 text-center whitespace-nowrap">
                    Items
                  </TableHead>
                  <TableHead className="w-32 whitespace-nowrap">
                    Total Amount
                  </TableHead>
                  <TableHead className="w-32 whitespace-nowrap">
                    Order Status
                  </TableHead>
                  <TableHead className="w-32 whitespace-nowrap">
                    Payment Status
                  </TableHead>
                  <TableHead className="text-right whitespace-nowrap pr-6">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <OrderRow key={order.id} order={order} />
                ))}
              </TableBody>
            </Table>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 shadow-inner">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-1">No orders placed yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm mb-6">
                You haven&apos;t placed any rental orders. Explore our vast gear
                collection and start your next adventure!
              </p>
              <Button asChild size="lg" className="gap-2 shadow-md">
                <Link href="/gears">
                  <ShoppingBag className="h-4 w-4" /> Browse Gear Catalog
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
