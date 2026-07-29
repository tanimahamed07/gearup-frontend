"use client";

import Link from "next/link";
import { useState } from "react";
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
  User,
  LayoutDashboard,
  LogOut,
  ShoppingBag,
  PlusCircle,
  ShieldCheck,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Navbar() {
  // 🔥 ডেমো ইউজার স্টেট (পরবর্তীতে আপনার Auth Hook/Context থেকে আসবে)
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: "USER" | "PROVIDER" | "ADMIN";
    avatar?: string;
  } | null>({
    name: "Tanim Ahamed",
    email: "tanim@gmail.com",
    role: "PROVIDER", // পরীক্ষা করার জন্য 'USER', 'PROVIDER', বা 'ADMIN' বদলাতে পারেন
  });

  const handleLogout = () => {
    // লগআউট লজিক এখানে যুক্ত হবে
    setUser(null);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Gears", href: "/gears" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
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
          {/* Theme Toggle */}
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
                      {user.name.substring(0, 2).toUpperCase()}
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

                {/* Role Specific Actions */}
                {user.role === "USER" && (
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link
                      href="/dashboard/user/orders"
                      className="flex items-center"
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" /> My Orders
                    </Link>
                  </DropdownMenuItem>
                )}

                {user.role === "PROVIDER" && (
                  <>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link
                        href="/dashboard/provider"
                        className="flex items-center"
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Provider
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link
                        href="/dashboard/provider/gears/add"
                        className="flex items-center"
                      >
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Gear
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                {user.role === "ADMIN" && (
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/dashboard/admin" className="flex items-center">
                      <ShieldCheck className="mr-2 h-4 w-4" /> Admin Panel
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

        {/* 📱 Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Theme Toggle */}
          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Dumbbell className="h-6 w-6 text-primary" /> GearUp
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 py-6">
                <div className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-base font-medium text-foreground hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="border-t pt-4">
                  {user ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 font-bold text-primary">
                            {user.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.role}
                          </p>
                        </div>
                      </div>
                      <Button
                        asChild
                        variant="outline"
                        className="justify-start"
                      >
                        <Link href={`/dashboard/${user.role.toLowerCase()}`}>
                          <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                        </Link>
                      </Button>
                      <Button
                        onClick={handleLogout}
                        variant="destructive"
                        className="justify-start"
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button asChild variant="outline">
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/register">Get Started</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
