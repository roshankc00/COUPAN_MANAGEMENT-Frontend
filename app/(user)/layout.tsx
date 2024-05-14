import type { Metadata } from "next";
import Providers from "@/components/Provider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg-px-8">
            <Toaster />
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
