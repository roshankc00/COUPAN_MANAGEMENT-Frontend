"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiArrowDropDownLine } from "react-icons/ri";
import { UseGetCurrentUser } from "@/hooks/react-query/users/get-current-user";
import { IoPersonCircle } from "react-icons/io5";
import { Button } from "./ui/button";
import { LogoutUser } from "@/common/api/api";

const LogoutButton = () => {
  const { data } = UseGetCurrentUser();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <p
            className="text-[16px]  flex gap-1 items-center capitalize
           text-white"
          >
            <IoPersonCircle color="white" size={25} />
            {data?.name}
            <RiArrowDropDownLine color="white" size={20} />
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => LogoutUser()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LogoutButton;
