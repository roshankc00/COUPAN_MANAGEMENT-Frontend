"use client";
import React from "react";
import MobileSideBar from "./smallscreen.sidebar";
import { Button } from "@/components/ui/button";
import { MdLogout } from "react-icons/md";
const TopNavbar = () => {
  return (
    <div className="bg-[#3577f1] w-full">
      <div className="flex justify-between px-3 py-5 -mt-2">
        <MobileSideBar />
        <Button variant={"outline"} className="flex items-center gap-2">
          Log Out <MdLogout />
        </Button>
      </div>
    </div>
  );
};

export default TopNavbar;
