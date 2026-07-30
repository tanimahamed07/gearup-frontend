import { ISidebarItem } from "@/lib/types/types";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Settings,
  ShoppingBag,
  Star,
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
    name: "Add New Gear",
    href: "/provider-dashboard/gears/add",
    icon: PlusCircle,
  },
  {
    name: "Rentals / Orders",
    href: "/provider-dashboard/orders",
    icon: ShoppingBag,
  },
  { name: "Reviews", href: "/provider-dashboard/reviews", icon: Star },
  {
    name: "Settings",
    href: "/provider-dashboard/settings",
    icon: Settings,
  },
];
