import type { Metadata } from "next";
import Providers from "@/components/Provider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <div className="bg-[#f0faf9]">{children}</div>
      <Footer />
    </div>
  );
}
