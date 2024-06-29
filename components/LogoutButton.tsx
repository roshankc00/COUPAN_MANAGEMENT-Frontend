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
import { IoPersonCircle } from "react-icons/io5";
import { Button } from "./ui/button";
import { LogoutUser } from "@/common/api/api";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import { Separator } from "./ui/separator";

const LogoutButton = () => {
  const { isLogedInStatus, name, role } = useSelector(
    (state: IRootState) => state.auth
  );
  const router = useRouter();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <p
            className="text-[16px]  flex gap-1 items-center capitalize
           text-white"
          >
            <IoPersonCircle color="white" size={25} />
            {name}
            <RiArrowDropDownLine color="white" size={20} />
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <Separator />
          <DropdownMenuSeparator />
          {role === "ADMIN" && (
            <DropdownMenuItem onClick={() => router.push("/admin/dashboard")}>
              Dashboard
            </DropdownMenuItem>
          )}
          <Separator />
          <DropdownMenuItem
            onClick={() => router.push("/user/userFollowedStore")}
          >
            Followed Store
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem onClick={() => router.push("/user/wishlist")}>
            All Saved Coupons
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem onClick={() => router.push("/user/order")}>
            My Orders
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem onClick={() => router.push("/user/licenses")}>
            My licenses
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem className="mt-2" onClick={() => LogoutUser()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LogoutButton;
