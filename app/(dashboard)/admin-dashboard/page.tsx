import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  Users,
  ShoppingBag,
  DollarSign,
  Package,
  UserCheck,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Mail,
  Calendar,
  Sparkles,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dashboardOverview } from "../_action/dashboardOverview";

// TypeScript Interfaces for Admin Dashboard Response
export interface IAdminStats {
  totalUsers: number;
  totalCustomers: number;
  totalProviders: number;
  totalGearItems: number;
  totalOrders: number;
  activeOrders: number;
  totalRevenue: number | string;
  pendingPayments: number;
}

export interface IRecentUser {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  status: string;
  createdAt: string | Date;
}

export interface IAdminDashboardData {
  stats: IAdminStats;
  recentUsers: IRecentUser[];
}

export default async function AdminOverviewPage() {
  const res = await dashboardOverview();
  const dashboardData: IAdminDashboardData | null = res?.data || null;

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mx-auto mb-3">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold">
            Failed to load admin dashboard
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Please check your administrator privileges or server response.
          </p>
        </div>
      </div>
    );
  }

  const { stats, recentUsers } = dashboardData;

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return (
          <Badge variant="default" className="bg-purple-600 font-medium">
            Admin
          </Badge>
        );
      case "PROVIDER":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30 font-medium"
          >
            Provider
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="font-medium">
            Customer
          </Badge>
        );
    }
  };

  const getUserStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
            Active
          </Badge>
        );
      case "BLOCKED":
      case "SUSPENDED":
        return (
          <Badge variant="destructive" className="font-medium">
            {status}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="font-medium">
            {status || "Active"}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            System Admin Overview
            <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500/20" />
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Platform performance, user management, and overall revenue insights.
          </p>
        </div>
      </div>

      {/* Top Level Key Metrics (4 Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Platform Revenue
            </CardTitle>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-foreground">
              ${Number(stats?.totalRevenue || 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" /> All-time
              completed payments
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Platform Users
            </CardTitle>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-foreground">
              {stats?.totalUsers || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.totalCustomers || 0} Customers •{" "}
              {stats?.totalProviders || 0} Providers
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Gear Items
            </CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <Package className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-foreground">
              {stats?.totalGearItems || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Listed across all providers
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Active Rentals
            </CardTitle>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
              <ShoppingBag className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-foreground">
              {stats?.activeOrders || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Out of {stats?.totalOrders || 0} total orders
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area: Recent Registered Users Full Width Table */}
      <Card className="border border-border/60 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-4 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-primary" />
            New Registered Users
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-xs font-normal"
          >
            <Link
              href="/admin-dashboard/users"
              className="flex items-center gap-1"
            >
              Manage All Users <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          {recentUsers && recentUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead>User Information</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined Date</TableHead>
                    <TableHead className="text-right">Account Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                            {user.name?.[0]?.toUpperCase() || "U"}
                          </div>
                          <div className="min-w-0 space-y-0.5">
                            <p className="font-semibold text-xs text-foreground line-clamp-1">
                              {user.name}
                            </p>
                            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                              <Mail className="h-3 w-3 shrink-0" />
                              <span className="line-clamp-1">{user.email}</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>{getRoleBadge(user.role)}</TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 shrink-0" />
                          <span>
                            {format(new Date(user.createdAt), "MMM dd, yyyy")}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="text-right">
                        {getUserStatusBadge(user.status)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-12 text-center text-muted-foreground text-xs">
              No registered users found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
