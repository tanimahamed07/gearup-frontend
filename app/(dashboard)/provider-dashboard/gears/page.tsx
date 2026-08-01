import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  XCircle,
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

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            Inventory Management
            <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500/20" />
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Manage your rental gears, update stock levels, and add new items
          </p>
        </div>

        {/* Modal Trigger Component */}
        <GearFormDialog categories={categories} mode="create" />
      </div>

      {/* Main Inventory Table Card */}
      <Card className="border border-border/60 shadow-sm rounded-xl overflow-hidden bg-card">
        <CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            All Inventory Items ({gears.length})
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {gears.length > 0 ? (
            /* Overflow wrapper for smooth mobile horizontal scrolling */
            <div className="overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader className="bg-muted/40">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[300px] whitespace-nowrap pl-6">
                      Gear Info
                    </TableHead>
                    <TableHead className="w-[160px] whitespace-nowrap">
                      Category
                    </TableHead>
                    <TableHead className="w-[140px] whitespace-nowrap">
                      Daily Rate
                    </TableHead>
                    <TableHead className="w-[120px] whitespace-nowrap">
                      Stock
                    </TableHead>
                    <TableHead className="w-[140px] whitespace-nowrap">
                      Status
                    </TableHead>
                    <TableHead className="text-right whitespace-nowrap pr-6 w-[100px]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gears.map((gear) => (
                    <TableRow
                      key={gear.id}
                      className="hover:bg-muted/40 transition-colors"
                    >
                      {/* Gear Info */}
                      <TableCell className="whitespace-nowrap pl-6">
                        <div className="flex items-center gap-3">
                          <div className="relative h-11 w-11 rounded-lg overflow-hidden bg-muted border border-border/80 shrink-0">
                            <Image
                              src={gear.image || "/placeholder.png"}
                              alt={gear.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div className="space-y-0.5 max-w-[200px] sm:max-w-xs">
                            <Link
                              href={`/gears/${gear.id}`}
                              className="font-bold text-sm text-foreground hover:text-primary transition-colors line-clamp-1 flex items-center gap-1 group"
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

                      {/* Category */}
                      <TableCell className="whitespace-nowrap">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-2.5 py-1 rounded">
                          {gear.category?.name || "N/A"}
                        </span>
                      </TableCell>

                      {/* Daily Rate */}
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-extrabold text-foreground tracking-tight">
                            ${Number(gear.pricePerDay).toFixed(2)}
                          </span>
                          <span className="text-[11px] text-muted-foreground font-medium">
                            / day
                          </span>
                        </div>
                      </TableCell>

                      {/* Stock */}
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-xs font-extrabold ${
                              gear.stock === 0
                                ? "text-rose-500"
                                : "text-foreground"
                            }`}
                          >
                            {gear.stock}
                          </span>
                          <span className="text-xs text-muted-foreground font-medium">
                            units
                          </span>
                        </div>
                      </TableCell>

                      {/* Status Badge */}
                      <TableCell className="whitespace-nowrap">
                        {gear.isAvailable && gear.stock > 0 ? (
                          <Badge className="gap-1 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30 whitespace-nowrap">
                            <CheckCircle2 className="h-3 w-3" /> Active
                          </Badge>
                        ) : (
                          <Badge className="gap-1 bg-red-500/15 text-red-700 dark:text-red-400 hover:bg-red-500/25 border border-red-500/30 whitespace-nowrap">
                            <XCircle className="h-3 w-3" /> Unavailable
                          </Badge>
                        )}
                      </TableCell>

                      {/* Action Menu */}
                      <TableCell className="text-right whitespace-nowrap pr-6">
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
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 shadow-inner">
                <Package className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-1">No gears in inventory</h3>
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
