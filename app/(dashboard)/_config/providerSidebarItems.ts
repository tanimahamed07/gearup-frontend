import { ISidebarItem } from "@/lib/types/types";
import {
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
} from "lucide-react";

export const PROVIDER_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    name: "Overview",
    href: "/provider-dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Gears",
    href: "/provider-dashboard/gears",
    icon: Package,
  },
  {
    name: "Rentals / Orders",
    href: "/provider-dashboard/orders",
    icon: ShoppingBag,
  },
  {
    name: "Settings",
    href: "/provider-dashboard/settings",
    icon: Settings,
  },
];
