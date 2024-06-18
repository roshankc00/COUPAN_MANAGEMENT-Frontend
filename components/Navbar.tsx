"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { Heart, Search } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import BreadCrumCom from "./BreadCrum";
import SearchBar from "./SearchBar";
import Logo from "../public/logo.jpg";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import { FaHeart } from "react-icons/fa6";
import { IoIosBookmark } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
const Navbar = () => {
  const router = useRouter();
  const { isLogedInStatus } = useSelector((state: IRootState) => state.auth);

  return (
    <div className="">
      {/* <div className="fixed w-full mb-0 z-100 -mt-[40px]"> */}
      <div className="flex justify-center items-center gap-5 bg-[#5271ff] w-full -mt-2">
        <div>
          <div
            className="cursor-pointer"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <Image
              className="w-[120px] h-[80px] rounded-md shadow-sm"
              src={Logo}
              alt="Logo"
            />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <SearchBar />
          </div>
          <div className="hidden md:block">
            {isLogedInStatus && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href={"/user/userFollowedStore"}>
                      <FaHeart color="red" size={25} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-white" side="top">
                    <p>See All Followed Store</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="hidden md:block">
            {isLogedInStatus && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href="/user/wishlist">
                      <IoIosBookmark color="white" size={25} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-white" side="top">
                    <p>See All BookMarkCoupons</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          {isLogedInStatus ? (
            <LogoutButton />
          ) : (
            <div className="flex gap-2">
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
          )}
        </div>
      </div>
      <BreadCrumCom />
    </div>
  );
};

export default Navbar;
