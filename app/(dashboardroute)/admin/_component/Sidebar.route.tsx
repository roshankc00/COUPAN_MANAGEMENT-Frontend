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
  CircleHelp,
  BadgeEuro,
  MessageCircleX,
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
      href: "/admin/dashboard",
    },
    {
      icon: MdCategory,
      label: "Category",
      href: "/admin/category",
    },
    {
      icon: Compass,
      label: "Sub-Category",
      href: "/admin/sub-category",
    },
    {
      icon: Component,
      label: "Coupon",
      href: "/admin/coupon",
    },
    {
      icon: SiMicrosoftstore,
      label: "Store",
      href: "/admin/store",
    },
    {
      icon: CircleHelp,
      label: "Faqs",
      href: "/admin/faqs",
    },
    {
      icon: BadgeEuro,
      label: "User-Send-Offer",
      href: "/admin/offer",
    },
    {
      icon: MessageCircleX,
      label: "Feedbacks",
      href: "/admin/userFeedback",
    },
    {
      icon: Users,
      label: "User",
      href: "/admin/user",
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
