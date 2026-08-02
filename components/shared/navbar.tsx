"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dumbbell,
  Menu,
  LayoutDashboard,
  LogOut,
  ShoppingBag,
  PlusCircle,
  ShieldCheck,
  ChevronRight,
  User,
  ListOrdered,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { logout } from "@/service/logout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export type UserData = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  avatar?: string;
  status?: string;
};

export interface NavbarProps {
  user?: {
    data?: UserData;
    success?: boolean;
    message?: string;
  } | null;
}

export default function Navbar({ user: initialUser }: NavbarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const user = initialUser?.data || null;

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    toast.success("User Logged Out Successfully!");
    router.push("/login");
  };

  // 🚀 Helper Function to determine dashboard route based on role
  const getDashboardRoute = (role: UserData["role"]) => {
    switch (role) {
      case "ADMIN":
        return "/admin-dashboard";
      case "PROVIDER":
        return "/provider-dashboard";
      case "CUSTOMER":
      default:
        return "/customer-dashboard";
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Gears", href: "/gears" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shadow-xs">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* 🏋️ Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <Dumbbell className="h-6 w-6 stroke-[2.5]" />
          </div>
          <span className="text-2xl font-black tracking-tight text-foreground">
            Gear<span className="text-primary">Up</span>
          </span>
        </Link>

        {/* 🌐 Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* 🔐 Right Section: Auth Actions / User Profile */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full ring-2 ring-primary/20 hover:ring-primary"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 font-bold text-primary">
                      {user.name
                        ? user.name.substring(0, 2).toUpperCase()
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                    <span className="mt-1 inline-block w-max rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                      {user.role}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* 📊 Main Dashboard Link */}
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link
                    href={getDashboardRoute(user.role)}
                    className="flex items-center"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                  </Link>
                </DropdownMenuItem>

                {/* Role Specific Extra Actions */}
                {user.role === "CUSTOMER" && (
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link
                      href="/customer-dashboard/orders"
                      className="flex items-center"
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" /> My Orders
                    </Link>
                  </DropdownMenuItem>
                )}

                {user.role === "PROVIDER" && (
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link
                      href="/provider-dashboard/orders"
                      className="flex items-center"
                    >
                      <ListOrdered className="mr-2 h-4 w-4" />
                      Upcoming Orders
                    </Link>
                  </DropdownMenuItem>
                )}

                {user.role === "ADMIN" && (
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link
                      href="/admin-dashboard/users"
                      className="flex items-center"
                    >
                      <User className="mr-2 h-4 w-4" /> Manage Users
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="shadow-md">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          )}
        </div>

        {/* 📱 Mobile Menu Trigger & Sheet */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] max-w-xs p-0 flex flex-col justify-between"
            >
              {/* Sheet Header */}
              <div>
                <SheetHeader className="p-6 border-b text-left">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Dumbbell className="h-5 w-5 stroke-[2.5]" />
                    </div>
                    <span className="text-xl font-black tracking-tight">
                      Gear<span className="text-primary">Up</span>
                    </span>
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Links */}
                <div className="flex flex-col p-4 space-y-1">
                  <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Navigation
                  </span>
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold rounded-md text-foreground hover:bg-muted transition-colors"
                    >
                      {link.name}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile User Profile Footer */}
              <div className="p-4 border-t bg-muted/30">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-background border shadow-xs">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-primary/10 font-bold text-primary">
                          {user.name
                            ? user.name.substring(0, 2).toUpperCase()
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-bold truncate">
                          {user.name}
                        </p>
                        <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                          {user.role}
                        </span>
                      </div>
                    </div>

                    <Button
                      asChild
                      variant="default"
                      className="w-full justify-start shadow-xs"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href={getDashboardRoute(user.role)}>
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Go to
                        Dashboard
                      </Link>
                    </Button>

                    <Button
                      onClick={handleLogout}
                      variant="destructive"
                      className="w-full justify-start"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button
                      asChild
                      className="w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/register">Get Started</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
