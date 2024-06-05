import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Provider";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/components/ReduxPersist";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-[#fcfcfc]">
          <ReduxProvider>
            <Providers>
              <Toaster />
              <div className="">{children}</div>
            </Providers>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
