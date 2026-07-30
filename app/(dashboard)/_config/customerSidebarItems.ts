import { LayoutDashboard, Settings, ShoppingBag, Star } from "lucide-react";
import { ADMIN_SIDEBAR_ITEMS } from "./adminSidebarItems";
import { ISidebarItem } from "@/lib/types/types";
import { PROVIDER_SIDEBAR_ITEMS } from "./providerSidebarItems";

const CUSTOMER_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    name: "Overview",
    href: "/customer-dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Orders",
    href: "/customer-dashboard/orders",
    icon: ShoppingBag,
  },
  {
    name: "My Reviews",
    href: "/customer-dashboard/reviews",
    icon: Star,
  },
  {
    name: "Settings",
    href: "/customer-dashboard/settings",
    icon: Settings,
  },
];

export const sidebarMenuItems = {
  CUSTOMER: CUSTOMER_SIDEBAR_ITEMS,
  PROVIDER: PROVIDER_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};
