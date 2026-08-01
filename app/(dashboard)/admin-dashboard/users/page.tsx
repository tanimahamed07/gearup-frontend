import React from "react";
import { format } from "date-fns";
import {
  Users,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  CheckCircle2,
  XCircle,
} from "lucide-react";

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
  const users: IUser[] = result?.data || [];


  // Role Badge Helper
  const getRoleBadge = (role: IUser["role"]) => {
    switch (role) {
      case "ADMIN":
        return (
          <Badge className="bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30 whitespace-nowrap font-semibold text-[11px]">
            ADMIN
          </Badge>
        );
      case "PROVIDER":
        return (
          <Badge className="bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30 whitespace-nowrap font-semibold text-[11px]">
            PROVIDER
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="text-muted-foreground whitespace-nowrap font-semibold text-[11px]"
          >
            CUSTOMER
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
            User Management
            <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500/20" />
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Manage system users, view account roles, and update account statuses
          </p>
        </div>
      </div>


      {/* Main Users Table Card */}
      <Card className="border border-border/60 shadow-sm rounded-xl overflow-hidden bg-card">
        <CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            All Accounts ({users.length})
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {users.length > 0 ? (
            /* Overflow wrapper for smooth mobile horizontal scrolling */
            <div className="overflow-x-auto">
              <Table className="min-w-[900px]">
                <TableHeader className="bg-muted/40">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[260px] whitespace-nowrap pl-6">
                      User Details
                    </TableHead>
                    <TableHead className="w-[220px] whitespace-nowrap">
                      Contact
                    </TableHead>
                    <TableHead className="w-[120px] whitespace-nowrap">
                      Role
                    </TableHead>
                    <TableHead className="w-[160px] whitespace-nowrap">
                      Joined Date
                    </TableHead>
                    <TableHead className="w-[140px] whitespace-nowrap">
                      Status
                    </TableHead>
                    <TableHead className="text-right whitespace-nowrap pr-6 w-[160px]">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user.id}
                      className="hover:bg-muted/40 transition-colors"
                    >
                      {/* Name & Avatar */}
                      <TableCell className="whitespace-nowrap pl-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-extrabold text-xs shrink-0 uppercase border border-primary/20">
                            {user.name?.[0] || "U"}
                          </div>
                          <div className="space-y-0.5 max-w-[180px]">
                            <p className="font-bold text-sm text-foreground line-clamp-1">
                              {user.name}
                            </p>
                            <p className="text-[11px] text-muted-foreground font-mono">
                              ID: {user.id.slice(0, 8)}...
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Contact Info */}
                      <TableCell className="whitespace-nowrap">
                        <div className="space-y-1 text-xs font-medium">
                          <div className="flex items-center gap-1.5 text-foreground">
                            <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
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
                      <TableCell className="whitespace-nowrap">
                        {getRoleBadge(user.role)}
                      </TableCell>

                      {/* Created At */}
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                          <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>
                            {user.createdAt
                              ? format(new Date(user.createdAt), "MMM dd, yyyy")
                              : "N/A"}
                          </span>
                        </div>
                      </TableCell>

                      {/* Status Badge */}
                      <TableCell className="whitespace-nowrap">
                        {user.status === "ACTIVE" ? (
                          <Badge className="gap-1 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30 whitespace-nowrap">
                            <CheckCircle2 className="h-3 w-3" /> ACTIVE
                          </Badge>
                        ) : (
                          <Badge className="gap-1 bg-red-500/15 text-red-700 dark:text-red-400 hover:bg-red-500/25 border border-red-500/30 whitespace-nowrap">
                            <XCircle className="h-3 w-3" /> SUSPENDED
                          </Badge>
                        )}
                      </TableCell>

                      {/* Update Status Dropdown */}
                      <TableCell className="text-right whitespace-nowrap pr-6">
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
            /* Empty State */
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 shadow-inner">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-1">No users found</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                There are no user accounts registered in the platform yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
