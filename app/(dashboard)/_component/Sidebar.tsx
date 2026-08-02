import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dumbbell,
  Home,
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  Settings,
  Package,
  Users,
  FolderTree,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { UserRole } from "../layout";
import { UserData } from "@/components/shared/navbar";

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

interface SidebarProps {
  user: UserData;
  role: UserRole;
  navItems: NavItem[];
  userInitials: string;
}

export default function Sidebar({
  user,
  role,
  navItems,
  userInitials,
}: SidebarProps) {
  return (
    <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 z-50 border-r border-border/60 bg-card">
      {/* Brand Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border/60">
        <Link
          href="/"
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <Dumbbell className="h-5 w-5 stroke-[2.5]" />
          </div>
          <span className="text-xl font-black tracking-tight text-foreground">
            Gear<span className="text-primary">Up</span>
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Menu
        </div>
        {navItems.map((item) => {
          const IconComponent = iconMap[item.iconName] || LayoutDashboard;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-lg text-muted-foreground transition-all duration-200 hover:text-primary hover:bg-primary/10"
            >
              <IconComponent className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-border/40">
          <Link
            href="/gears"
            className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" /> Back to Main Site
          </Link>
        </div>
      </div>

      {/* Clean User Card in Sidebar Bottom */}
      <div className="p-4 border-t border-border/60 bg-muted/20">
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
      </div>
    </aside>
  );
}
