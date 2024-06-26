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
import FeaturedProduct from "@/components/home/Products";
import CouponSkeletonCard from "@/components/cards/CouponSkeleton";
import { useEffect } from "react";
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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg-px-8 my-10 z-0 ">
        <Silder />
        <div>
          <h1 className=" ms-6 text-3xl font-bold mt-10">
            Shop at Your Favorite Stores
          </h1>
          <FeaturedStore />
        </div>

        {/* featured coupons  */}
        <div>
          <h1 className=" ms-6 text-3xl font-bold">
            Discover Todays Best Coupons
          </h1>
          <Featuredcoupons />
        </div>
        {/* featured product  */}
        <div>
          <div className="flex justify-between items-center mt-5 px-8">
            <h1 className=" ms-6 text-3xl font-bold mt-10">
              Our Feature Products
            </h1>
          </div>
          <FeaturedProduct />
        </div>
        <div>
          <h1 className=" ms-6 text-3xl font-bold mt-10">
            Shop at Your Favorite Categories
          </h1>
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
