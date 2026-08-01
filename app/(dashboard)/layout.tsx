import React, { Suspense } from "react";
import Link from "next/link";
import { getMe } from "@/service/getMe";

// Icons
import { Bell, User as UserIcon, LogOut, Settings } from "lucide-react";

// shadcn/ui components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import Sidebar from "./_component/Sidebar";
import MobileSeet from "./_component/MobileSeet";
import { sidebarMenuItems } from "./_config/customerSidebarItems";
import DashboardLoading from "./admin-dashboard/loading";

// Types
export type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userResponse = await getMe();

  // Extract user data
  const user = userResponse?.data || null;

  // Calculate user role
  const role: UserRole = user?.role as UserRole;

  // Calculate user initials
  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  // Get navigation items based on role
  const navItems = sidebarMenuItems[role] || sidebarMenuItems.CUSTOMER;

  return (
    // overflow-x-hidden নিশ্চিত করে যে মোবাইলে কোনো অবস্থাতেই ডানে অতিরিক্ত স্ক্রোলবার আসবে না
    <div className="flex min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ------------------------------------------------------------- */}
      {/* ১. Desktop Sidebar (Large Screens)                            */}
      {/* ------------------------------------------------------------- */}
      <Sidebar
        user={user}
        role={role}
        navItems={navItems}
        userInitials={userInitials}
      />

      {/* ------------------------------------------------------------- */}
      {/* ২. Main Section (Header + Body)                               */}
      {/* ------------------------------------------------------------- */}
      {/* CHANGE HERE: added 'min-w-0' & 'w-full' */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0 w-full">
        {/* Top Header */}
        <header className="sticky top-0 z-40 h-16 flex items-center justify-between gap-4 border-b border-border/60 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 lg:px-8 shadow-xs">
          {/* Mobile Sheet Navigation */}
          <div className="flex items-center gap-2 lg:hidden">
            <MobileSeet
              user={user}
              role={role}
              navItems={navItems}
              userInitials={userInitials}
            />
          </div>

          {/* Right Header Actions */}
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />

            {/* Notification Bell */}
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
            </Button>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full ring-2 ring-primary/20 hover:ring-primary"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user?.avatar || user?.image}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none">
                      {user?.name || "User Name"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || "user@example.com"}
                    </p>
                    <span className="mt-1.5 inline-block w-max rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                      {user?.role || "CUSTOMER"}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/dashboard/profile" className="flex items-center">
                    <UserIcon className="mr-2 h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center"
                  >
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* ------------------------------------------------------------- */}
        {/* ৩. Dashboard Content Section                                 */}
        {/* ------------------------------------------------------------- */}
        {/* CHANGE HERE: added 'min-w-0' to keep width contained */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
