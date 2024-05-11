import { Button } from "@/components/ui/button";
import useUserStore from "@/store";
import { Sidebar } from "lucide-react";
import Image from "next/image";
import MobileSideBar from "./(dashboard)/_component/smallscreen.sidebar";
import logo from "../public/logo.jpg";
import Navbar from "@/components/Navbar";

export async function generateMetadata() {
  const ogImageUrl = logo;
  return {
    title: "Nepque",
    description: `Get a Discount save money`,
    keywords: ["Coupon-store", "store", "discount", "Coupons"],
    openGraph: {
      images: [ogImageUrl],
    },
    ["og:image"]: ogImageUrl,
  };
}

export default function Home() {
  return (
    <div className="h-[100vh]">
      <Navbar />
    </div>
  );
}
