import React from "react";
import { format } from "date-fns";
import { Users, Shield, Mail, Phone, Calendar } from "lucide-react";

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

import { getAllUsers } from "../../_action/getAllUsers";
import { UserStatusSelect } from "../../_component/UserStatusSelect";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED";
  phone?: string;
  createdAt: string;
}

export default async function UserManagementPage() {
  const result = await getAllUsers();
  // Fixed bitwise OR bug here
  const users: IUser[] = result?.data || [];

  // Overview Stats
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "ACTIVE").length;
  const providersCount = users.filter((u) => u.role === "PROVIDER").length;

  return (
    <div className="space-y-6 p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          User Management
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage system users, view account roles, and update account statuses.
        </p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Registered Users
            </CardTitle>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-foreground">
              {totalUsers}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Active Accounts
            </CardTitle>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <Shield className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-foreground">
              {activeUsers}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Providers
            </CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-foreground">
              {providersCount}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="border border-border/60 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            All Accounts ({users.length})
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {users.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="w-56">User Details</TableHead>
                    <TableHead className="w-48">Contact</TableHead>
                    <TableHead className="w-32">Role</TableHead>
                    <TableHead className="w-36">Joined Date</TableHead>
                    <TableHead className="w-28">Status</TableHead>
                    <TableHead className="w-36 text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      {/* Name & Avatar */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0 uppercase">
                            {user.name?.[0] || "U"}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-foreground">
                              {user.name}
                            </p>
                            <p className="text-xs text-muted-foreground font-mono">
                              ID: {user.id.slice(0, 8)}...
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Contact Info */}
                      <TableCell>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Mail className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate max-w-[180px]">
                              {user.email}
                            </span>
                          </div>
                          {user.phone && (
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Phone className="h-3.5 w-3.5 shrink-0" />
                              <span>{user.phone}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>

                      {/* User Role Badge */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`font-semibold text-[11px] ${
                            user.role === "ADMIN"
                              ? "bg-purple-500/10 text-purple-600 border-purple-200"
                              : user.role === "PROVIDER"
                                ? "bg-blue-500/10 text-blue-600 border-blue-200"
                                : "bg-gray-500/10 text-gray-600 border-gray-200"
                          }`}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>

                      {/* Created At */}
                      <TableCell className="text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          {user.createdAt
                            ? format(new Date(user.createdAt), "MMM dd, yyyy")
                            : "N/A"}
                        </div>
                      </TableCell>

                      {/* Status Badge */}
                      <TableCell>
                        {user.status === "ACTIVE" ? (
                          <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-medium">
                            ACTIVE
                          </Badge>
                        ) : (
                          <Badge className="bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30 font-medium">
                            SUSPENDED
                          </Badge>
                        )}
                      </TableCell>

                      {/* Update Status Dropdown */}
                      <TableCell className="text-right">
                        <UserStatusSelect
                          userId={user.id}
                          currentStatus={user.status}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No users found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
