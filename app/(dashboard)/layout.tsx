import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getMe } from "@/service/getMe";

import Sidebar from "./_component/Sidebar";
import DashboardHeader from "./_component/DashboardHeader";
import { sidebarMenuItems } from "./_config/customerSidebarItems";

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

  // Check if user is suspended - log them out immediately
  if (user && user.status === "SUSPENDED") {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    redirect("/login?suspended=true");
  }

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
        <DashboardHeader
          user={user}
          role={role}
          navItems={navItems}
          userInitials={userInitials}
        />

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
