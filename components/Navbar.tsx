"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import BreadCrumCom from "./BreadCrum";

const Navbar = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-center items-center gap-5 bg-[#5271ff] w-full">
        <div>
          <Link href="/">
            <img
              className="w-[150px] h-[80px] rounded-md shadow-sm"
              src="../logo.jpg"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="flex gap-4">
          <Input
            className="w-[400px] px-7"
            placeholder="Search for Store Coupon"
          />
          <Search className="absolute top-[32px] ms-2 h-4 w-5" />
          <Button variant="outline" onClick={() => router.push("/login")}>
            Login
          </Button>
          <Button variant="outline" onClick={() => router.push("/signup")}>
            Signup
          </Button>
        </div>
      </div>
      <BreadCrumCom />
    </div>
  );
};

export default Navbar;
