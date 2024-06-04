"use client";
import { UseGetCurrentUser } from "@/hooks/react-query/users/get-current-user";
import React from "react";
import { MdWavingHand } from "react-icons/md";
import MobileSideBar from "./smallscreen.sidebar";
import { Button } from "@/components/ui/button";
import { MdLogout } from "react-icons/md";
const options = {
  year: "numeric",
  weekday: "short",
  month: "short",
  day: "2-digit",
} as const;
const TopNavbar = () => {
  const { data } = UseGetCurrentUser();
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
