import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const BreadCrumCom = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg-px-8 py-5">
      <Breadcrumb>
        <BreadcrumbList className="flex justify-between  w-full">
          <div className="flex gap-4">
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="border-none flex gap-2 text-black">
                  Categories
                  <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col justify-center items-center">
                  <DropdownMenuLabel>Categories</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/browse/category" className="underline">
                      View All Category
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="border-none flex gap-2 text-black">
                  Stores
                  <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col justify-center items-center">
                  <DropdownMenuLabel>Stores</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/browse/category" className="underline">
                      View All Stores
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="border-none flex gap-2 text-black">
                  Coupons
                  <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col justify-center items-center">
                  <DropdownMenuLabel>Coupons</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/browse/category" className="underline">
                      View All coupons
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </div>
          <div className="flex gap-3">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-black">
                Help
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-black" href="/components">
                Setting
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumCom;
