import { ISidebarItem } from "@/lib/types/types";
import { LayoutDashboard, Package, Settings, ShoppingBag, Users } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  { name: "Overview", href: "/admin-dashboard", icon: LayoutDashboard },
  {
    name: "Manage Gears",
    href: "/admin-dashboard/gears",
    icon: Package,
  },
  { name: "Manage Users", href: "/admin-dashboard/users", icon: Users },
  {
    name: "All Orders",
    href: "/admin-dashboard/orders",
    icon: ShoppingBag,
  },
  {
    name: "Settings",
    href: "/admin-dashboard/settings",
    icon: Settings,
  },
];
