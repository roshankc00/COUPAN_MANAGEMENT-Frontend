import { Button, buttonVariants } from "@/components/ui/button";
import { Sidebar } from "lucide-react";
import Image from "next/image";
import logo from "../public/logo.jpg";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import FaqsCom from "@/components/home/Faqs";
import Featuredcoupons from "@/components/home/Featured.coupons";
import FeaturedStore from "@/components/home/FeaturedStore";
import Cookies from "js-cookie";
import Footer from "@/components/Footer";
import TableSkeleton from "@/components/TableSkeleton";
import { handleLogin } from "@/common/api/users/user.api";
import Silder from "@/components/home/Silder";
import FeatureCategory from "@/components/home/Featured.cateory";
export async function generateMetadata() {
  const ogImageUrl = logo;
  return {
    title: "Home | Nepque",
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
    <div>
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg-px-8 my-10 z-0">
        <Silder />
        <div>
          <div className="flex justify-between items-center mt-5 px-8">
            <h1 className="font-medium text-xl">Featured Stores</h1>
            <button className="border border-[#5271ff] text-[#5271ff]  rounded-full px-5 text-sm py-1 mt-3">
              View Stores
            </button>
          </div>
          <FeaturedStore />
        </div>

        {/* featured coupons  */}
        <div>
          <div className="flex justify-between items-center mt-5 px-8">
            <h1 className="font-medium text-xl">Featured Coupons</h1>
            <button className="border border-[#5271ff] text-[#5271ff]  rounded-full px-5 text-sm py-1 mt-3">
              View Coupons
            </button>
          </div>
          <Featuredcoupons />
        </div>
        {/* featured product  */}
        <div>
          <div className="flex justify-between items-center mt-5 px-8">
            <h1 className="font-medium text-xl">Featured Category</h1>
            <button className="border border-[#5271ff] text-[#5271ff]  rounded-full px-5 text-sm py-1 mt-3">
              View Category
            </button>
          </div>
          <FeatureCategory />
        </div>

        {/* faqs section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg-px-8">
          <h1 className="font-medium text-3xl my-5  text-center text-[#5271ff]">
            {" "}
            Frequently Asked Questions
          </h1>
          <FaqsCom />
        </div>
      </div>
      <Footer />
    </div>
  );
}
