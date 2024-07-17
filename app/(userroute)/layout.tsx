import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg-px-8 mt-5">
        <Toaster />
        {children}
      </div>
      <Footer />
    </div>
  );
}
