"use client";
import React, { useState } from "react";
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
import { IStore } from "@/interfaces/Store.interface";
import { ICategory } from "@/interfaces/category.interface";

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
  const [isOpen, setIsOpen] = useState({
    category: false,
    store: false,
  });

  const handleMouseEnter = (menu: "category" | "store") => {
    setIsOpen((prevState) => ({ ...prevState, [menu]: true }));
  };

  const handleMouseLeave = () => {
    setIsOpen({ category: false, store: false });
  };

  return (
    <div className="w-full z-100 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-5">
        <Breadcrumb className="text-[16px]">
          <BreadcrumbList className="flex justify-between items-center w-full">
            <div className="flex gap-4">
              <BreadcrumbItem
                onMouseEnter={() => handleMouseEnter("category")}
                onMouseLeave={handleMouseLeave}
              >
                <DropdownMenu open={isOpen.category}>
                  <DropdownMenuTrigger className="border-none flex gap-2 text-black">
                    Categories
                    <ChevronDown className="h-5 w-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex flex-col justify-center items-center">
                    <DropdownMenuLabel>Categories</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {!catFetching &&
                      !catLoading &&
                      allCategory?.slice(0, 5).map((item: ICategory) => {
                        return (
                          <DropdownMenuItem key={item.id}>
                            <Link href={`/user/browse/category/${item.id}`}>
                              {item.title}
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    <DropdownMenuItem>
                      <Link href="/browse/category" className="underline">
                        View All Categories
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbItem
                onMouseEnter={() => handleMouseEnter("store")}
                onMouseLeave={handleMouseLeave}
              >
                <DropdownMenu open={isOpen.store}>
                  <DropdownMenuTrigger className="border-none flex gap-2 text-black">
                    Stores
                    <ChevronDown className="h-5 w-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex flex-col justify-center items-center">
                    <DropdownMenuLabel>Stores</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {!storeFetching &&
                      !storeLoading &&
                      allStore?.slice(0, 5).map((item: IStore) => {
                        return (
                          <DropdownMenuItem key={item.id}>
                            <Link href={`/user/browse/store/${item.id}`}>
                              {item.title}
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    <DropdownMenuItem>
                      <Link href="/user/browse/store" className="underline">
                        View All Stores
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link className="text-black" href="/user/browse/coupon">
                  Coupon
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link className="text-black" href="/user/submit-offer">
                  Submit-Offer
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link className="text-black" href="/user/products">
                  Products
                </Link>
              </BreadcrumbItem>
            </div>
            <div className="flex gap-3">
              <BreadcrumbItem>
                <BreadcrumbLink href="/user/blogs" className="text-black">
                  Blogs
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-black" href="/user/contact">
                  Contact
                </BreadcrumbLink>
              </BreadcrumbItem>
            </div>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default BreadCrumCom;
