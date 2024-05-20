import { Button, buttonVariants } from "@/components/ui/button";
import { Sidebar } from "lucide-react";
import Image from "next/image";
import MobileSideBar from "./(dashboard)/_component/smallscreen.sidebar";
import logo from "../public/logo.jpg";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import FaqsCom from "@/components/Faqs";
import Featuredcoupons from "@/components/home/Featured.coupons";
import FeaturedStore from "@/components/home/FeaturedStore";
import Cookies from "js-cookie";
import Footer from "@/components/Footer";
import TableSkeleton from "@/components/TableSkeleton";
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
      {/* hero section */}
      <div className="shadow-sm border border-b-slate-100">
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your Infrastructure
            <span className="text-blue-600"> For Coupon</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to Nepque. Pick the coupon and grab the discount. Enjoy
            shopping. Online shopping means Nepque
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/browse/coupons" className={buttonVariants()}>
              Browse Coupons &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* featured stores */}
      <div>
        <h1 className="font-medium text-3xl my-5  text-center mt-10">
          Most Popular Store
        </h1>
        <FeaturedStore />
      </div>

      {/* featured product  */}
      <div>
        <h1 className="font-medium text-3xl my-5  text-center mt-10">
          Today's Most Popular Coupons & Deals
        </h1>
        <Featuredcoupons />
      </div>

      {/* faqs section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg-px-8">
        <h1 className="font-medium text-3xl my-5  text-center">
          {" "}
          Frequently Asked Questions
        </h1>
        <FaqsCom />
      </div>
      <Footer />
    </div>
  );
}
