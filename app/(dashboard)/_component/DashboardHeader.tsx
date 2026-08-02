"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bell, LogOut, Settings, User as UserIcon } from "lucide-react";
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
import MobileSeet from "./MobileSeet";
import { UserRole } from "../layout";
import { UserData } from "@/components/shared/navbar";
import { logout } from "@/service/logout";
import { toast } from "sonner";

interface NavItem {
  name: string;
  href: string;
  iconName: string;
}

interface DashboardHeaderProps {
  user: UserData;
  role: UserRole;
  navItems: NavItem[];
  userInitials: string;
}

export default function DashboardHeader({
  user,
  role,
  navItems,
  userInitials,
}: DashboardHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    toast.success("User Logged Out Successfully!");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 h-16 flex items-center justify-between gap-4 border-b border-border/60 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 lg:px-8 shadow-xs">
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
              <Link href="/dashboard/settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" /> Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
