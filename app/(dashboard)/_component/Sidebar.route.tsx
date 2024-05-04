import React from "react";
import {
  BarChart,
  Compass,
  Globe2,
  HelpCircle,
  Layout,
  List,
  Timer,
} from "lucide-react";
import SidebarItem from "./Sidebar.item";

type Props = {};

function SidebarRoutes({}: Props) {
  const routes = [
    {
      icon: Layout,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: Compass,
      label: "Category",
      href: "/category",
    },
    {
      icon: Compass,
      label: "Sub-Category",
      href: "/sub-category",
    },
    {
      icon: Compass,
      label: "Coupon",
      href: "/coupon",
    },
    {
      icon: Compass,
      label: "Store",
      href: "/store",
    },
    {
      icon: Compass,
      label: "User",
      href: "/user",
    },
  ] as const;
  return (
    <div className="flex flex-col w-full">
      {routes?.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
}

export default SidebarRoutes;
