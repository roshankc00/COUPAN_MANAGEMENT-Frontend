"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Filter } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UseGetAllCategory } from "@/hooks/react-query/categories/get_all_category.hook";
import { useRouter } from "next/navigation";
import { ICategory } from "@/interfaces/category.interface";

export default function BrowseCategoryPage() {
  const router = useRouter();
  const { data, isFetching, isLoading } = UseGetAllCategory();
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg-px-8">
      <h1 className="text-3xl font-medium my-3 mb-8">
        Coupons, Promo Codes & Deals by Category
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 place-content-center">
        {!isFetching &&
          !isLoading &&
          data?.map((item: ICategory) => (
            <div
              className="flex items-center justify-between shadow-sm rounded-md px-2 border border-slate-200"
              onClick={() => router.push(`/browse/category/${item.id}`)}
            >
              <img
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${item?.imageName}`}
                alt=""
                className="h-20 w-20"
              />
              <h1 className="text-[16px] font-medium">{item.title}</h1>
            </div>
          ))}
      </div>
    </main>
  );
}
