import React from "react";
import {
  ArchiveRestore,
  BarChart,
  Compass,
  Globe2,
  HelpCircle,
  Layout,
  List,
  Timer,
  Users,
  Component,
} from "lucide-react";
import SidebarItem from "./Sidebar.item";
import { MdCategory, MdDashboard } from "react-icons/md";
import { SiMicrosoftstore } from "react-icons/si";
type Props = {};

function SidebarRoutes({}: Props) {
  const routes = [
    {
      icon: MdDashboard,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: MdCategory,
      label: "Category",
      href: "/category",
    },
    {
      icon: Compass,
      label: "Sub-Category",
      href: "/sub-category",
    },
    {
      icon: Component,
      label: "Coupon",
      href: "/coupon",
    },
    {
      icon: SiMicrosoftstore,
      label: "Store",
      href: "/store",
    },
    {
      icon: Users,
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
