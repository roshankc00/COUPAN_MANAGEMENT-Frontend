"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Provider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import logo from "../public/logo.jpg";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import ReduxProvider from "@/components/ReduxPersist";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-[#fcfcfc]">
          <ReduxProvider>
            <Providers>
              <Toaster />
              <div className="">{children}</div>
              {/* {pathName !== "/login" && pathName !== "/signup" && <Footer />} */}
            </Providers>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
