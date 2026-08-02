"use client";

import {
  Dumbbell,
  Home,
  Menu,
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  Settings,
  Package,
  Users,
  FolderTree,
  LucideIcon,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserRole } from "../layout";
import { UserData } from "@/components/shared/navbar";
import { logout } from "@/service/logout";
import { toast } from "sonner";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  Settings,
  Package,
  Users,
  FolderTree,
};

interface NavItem {
  name: string;
  href: string;
  iconName: string;
}

interface MobileSheetProps {
  user: UserData;
  role: UserRole;
  navItems: NavItem[];
  userInitials: string;
}

export default function MobileSeet({
  user,
  role,
  navItems,
  userInitials,
}: MobileSheetProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    toast.success("User Logged Out Successfully!");
    router.push("/login");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 flex flex-col">
        <SheetHeader className="h-16 flex justify-center px-6 border-b border-border/60">
          <SheetTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Dumbbell className="h-5 w-5 stroke-[2.5]" />
            </div>
            <span className="text-lg font-black tracking-tight">
              Gear<span className="text-primary">Up</span>
            </span>
          </SheetTitle>
        </SheetHeader>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Menu
          </div>
          {navItems.map((item) => {
            const IconComponent = iconMap[item.iconName] || LayoutDashboard;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <IconComponent className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-border/40">
            <Link
              href="/gears"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" /> Back to Main Site
            </Link>
          </div>
        </div>

        {/* User Card at Bottom */}
        <div className="p-4 border-t border-border/60 bg-muted/20 space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-card border border-border/40 shadow-xs">
            <Avatar className="h-9 w-9 ring-2 ring-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate text-foreground">
                {user?.name || "Guest User"}
              </p>
              <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary">
                {role}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full justify-start text-sm"
            size="sm"
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
