export const CUSTOMER_SIDEBAR_ITEMS = [
  {
    name: "Overview",
    href: "/customer-dashboard",
    iconName: "LayoutDashboard",
  },
  {
    name: "My Orders",
    href: "/customer-dashboard/orders",
    iconName: "ShoppingBag",
  },
  {
    name: "Payment History",
    href: "/customer-dashboard/payments",
    iconName: "CreditCard",
  },
];

export const PROVIDER_SIDEBAR_ITEMS = [
  {
    name: "Overview",
    href: "/provider-dashboard",
    iconName: "LayoutDashboard",
  },
  {
    name: "My Gears",
    href: "/provider-dashboard/gears",
    iconName: "Package",
  },
  {
    name: "Rentals / Orders",
    href: "/provider-dashboard/orders",
    iconName: "ShoppingBag",
  },
];

export const ADMIN_SIDEBAR_ITEMS = [
  {
    name: "Overview",
    href: "/admin-dashboard",
    iconName: "LayoutDashboard",
  },
  {
    name: "Manage Users",
    href: "/admin-dashboard/users",
    iconName: "Users",
  },
  {
    name: "Manage Category",
    href: "/admin-dashboard/categories",
    iconName: "FolderTree",
  },
];

export const sidebarMenuItems = {
  CUSTOMER: CUSTOMER_SIDEBAR_ITEMS,
  PROVIDER: PROVIDER_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};
