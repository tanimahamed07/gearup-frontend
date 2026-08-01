import { ISidebarItem } from "@/lib/types/types";
import {
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  { name: "Overview", href: "/admin-dashboard", icon: LayoutDashboard },
  { name: "Manage Users", href: "/admin-dashboard/users", icon: Users },
  {
    name: "Settings",
    href: "/admin-dashboard/settings",
    icon: Settings,
  },
];
