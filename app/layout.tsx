import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Provider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import logo from "../public/logo.jpg";

const inter = Inter({ subsets: ["latin"] });

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster />
          <div className="">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
