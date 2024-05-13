"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
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
import { UseGetAllCategory } from "@/hooks/react-query/categories/get_all_category.hook";
import { UseGetAllStore } from "@/hooks/react-query/stores/get_all_store_hook";

const BreadCrumCom = () => {
  const {
    data: allCategory,
    isFetching: catFetching,
    isLoading: catLoading,
  } = UseGetAllCategory();
  const {
    data: allStore,
    isFetching: storeFetching,
    isLoading: storeLoading,
  } = UseGetAllStore();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg-px-8 py-5">
      <Breadcrumb>
        <BreadcrumbList className="flex justify-between items-center w-full ">
          <div className="flex gap-4">
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="border-none flex gap-2 text-black">
                  Categories
                  <ChevronDown className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col justify-center items-center">
                  <DropdownMenuLabel>Categories</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {!catFetching &&
                    !catLoading &&
                    allCategory?.slice(0, 5).map((item: any) => {
                      return (
                        <DropdownMenuItem key={item.id}>
                          <Link href={`/browse/category/${item.id}`}>
                            {item.title}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
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
                  <ChevronDown className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col justify-center items-center">
                  <DropdownMenuLabel>Stores</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {!storeFetching &&
                    !storeLoading &&
                    allStore?.slice(0, 5).map((item: any) => {
                      return (
                        <DropdownMenuItem key={item.id}>
                          <Link
                            href={`/browse/store/${item.id}`}
                            className="underline"
                          >
                            {item.title}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  <DropdownMenuItem>
                    <Link href="/browse/store" className="underline">
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
                  <ChevronDown className="h-5 w-5" />
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
