import React from "react";
import {
  Compass,
  Users,
  Component,
  CircleHelp,
  BadgeEuro,
  MessageCircleX,
  Link,
  Scale,
  ListOrdered,
  ShoppingBasket,
  ShoppingCart,
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
      icon: Compass,
      label: "Sub-Category",
      href: "/admin/sub-category",
    },
    {
      icon: SiMicrosoftstore,
      label: "Store",
      href: "/admin/store",
    },
    {
      icon: MdCategory,
      label: "Category",
      href: "/admin/category",
    },
    {
      icon: Component,
      label: "Coupon",
      href: "/admin/coupon",
    },
    {
      icon: Link,
      label: "Affiliate Link",
      href: "/admin/affilate-link",
    },

    {
      icon: CircleHelp,
      label: "Faqs",
      href: "/admin/faqs",
    },
    {
      icon: Users,
      label: "User",
      href: "/admin/user",
    },
    {
      icon: ShoppingBasket,
      label: "Products",
      href: "/admin/products",
    },
    {
      icon: ShoppingCart,
      label: "Sub-Product",
      href: "/admin/sub-product",
    },
    {
      icon: ListOrdered,
      label: "Orders",
      href: "/admin/orders",
    },
    {
      icon: Scale,
      label: "License",
      href: "/admin/license",
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
  ] as const;
  return (
    <div className="flex flex-col w-full pb-24">
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
