import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";

import { getProviderGearList } from "../../_action/providerGearList";
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

import { GearFormDialog } from "../../_component/GearFormDialog";
import { getCategory } from "@/app/(public)/_action/getCategory";
import { ICategory } from "@/lib/types/types";
import { GearActionMenu } from "../../_component/GearActionMenu";
import { deleteGearItem } from "../../_action/deleteGearItem";

export interface IGearItem {
  id: string;
  name: string;
  brand: string;
  description: string;
  image?: string;
  pricePerDay: number | string;
  stock: number;
  isAvailable: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  providerId: string;
  categoryId: string;
  category?: ICategory;
}

export default async function ManageInventory() {
  const res = await getProviderGearList();
  const gears: IGearItem[] = res?.data || [];
  const response = await getCategory();
  const categories: ICategory[] = response?.data || [];




  console.log(categories);

  // Calculate Overview Stats
  const totalItems = gears.length;
  const activeItems = gears.filter((g) => g.isAvailable).length;
  const outOfStockItems = gears.filter((g) => g.stock === 0).length;
  const totalStockUnits = gears.reduce(
    (acc, curr) => acc + Number(curr.stock || 0),
    0,
  );

  return (
    <div className="space-y-6 p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Header with Encapsulated Dialog */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Inventory Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your rental gears, update stock levels, and add new items.
          </p>
        </div>

        {/* Modal Trigger Component */}
        <GearFormDialog categories={categories} mode="create" />
      </div>

      {/* Quick Inventory Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Gear Items
            </CardTitle>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Package className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-foreground">
              {totalItems}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Unique products listed
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Available For Rent
            </CardTitle>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-foreground">
              {activeItems}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Active on marketplace
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Units Stock
            </CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <Layers className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-foreground">
              {totalStockUnits}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Units available in total
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Out of Stock
            </CardTitle>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-foreground">
              {outOfStockItems}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Requires restocking
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Inventory Table */}
      <Card className="border border-border/60 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              All Inventory Items ({gears.length})
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {gears.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="w-75">Gear Info</TableHead>
                    <TableHead className="w-35">Category</TableHead>
                    <TableHead className="w-27.5">Daily Rate</TableHead>
                    <TableHead className="w-25">Stock</TableHead>
                    <TableHead className="w-32.5">Status</TableHead>
                    <TableHead className="text-right w-20">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gears.map((gear) => (
                    <TableRow
                      key={gear.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted border shrink-0">
                            <Image
                              src={gear.image || "/placeholder.png"}
                              alt={gear.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div className="space-y-0.5 max-w-50 sm:max-w-60">
                            <Link
                              href={`/gears/${gear.id}`}
                              className="font-semibold text-sm text-foreground hover:text-primary transition-colors line-clamp-1 flex items-center gap-1 group"
                            >
                              {gear.name}
                              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                            </Link>
                            <p className="text-xs text-muted-foreground font-medium">
                              {gear.brand}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="bg-muted/60 text-muted-foreground border border-border/40 font-normal rounded-md"
                        >
                          {gear.category?.name || "N/A"}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <span className="font-semibold text-sm text-foreground">
                          ${Number(gear.pricePerDay).toFixed(2)}
                        </span>
                        <span className="text-[10px] text-muted-foreground block">
                          / day
                        </span>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`font-semibold text-sm ${
                              gear.stock === 0
                                ? "text-rose-500"
                                : "text-foreground"
                            }`}
                          >
                            {gear.stock}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            units
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        {gear.isAvailable && gear.stock > 0 ? (
                          <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                            Active
                          </Badge>
                        ) : (
                          <Badge className="bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/20 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5" />
                            Unavailable
                          </Badge>
                        )}
                      </TableCell>

                      <TableCell className="text-right">
                        <GearActionMenu gear={gear} categories={categories} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-1">
                No gears in inventory
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mb-6">
                You haven&apos;t added any gear items for rent yet. Start
                listing your items to get bookings!
              </p>

              {/* Empty state modal trigger */}
              <GearFormDialog categories={categories} mode="create" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
