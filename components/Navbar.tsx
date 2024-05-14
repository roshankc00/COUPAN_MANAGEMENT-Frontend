"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import BreadCrumCom from "./BreadCrum";
import SearchBar from "./SearchBar";
import Logo from "../public/logo.jpg";
import Image from "next/image";
const Navbar = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-center items-center gap-5 bg-[#5271ff] w-full">
        <div>
          <Link href="/">
            <Image
              className="w-[120px] h-[80px] rounded-md shadow-sm"
              src={Logo}
              alt="Logo"
            />
          </Link>
        </div>
        <div className="flex gap-4">
          <SearchBar />
          <Button
            variant="outline"
            className="w-[40px] text-[11px] sm:text-[14px] sm:w-[70px]"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          <Button
            className="w-[40px] text-[11px] sm:text-[14px] sm:w-[70px]"
            variant="outline"
            onClick={() => router.push("/signup")}
          >
            Signup
          </Button>
        </div>
      </div>
      <BreadCrumCom />
    </div>
  );
};

export default Navbar;
