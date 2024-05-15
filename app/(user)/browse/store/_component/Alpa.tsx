"use client";
import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { NextPage } from "next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UseGetAllStore } from "@/hooks/react-query/stores/get_all_store_hook";
import { useRouter } from "next/navigation";
import { IStore } from "@/interfaces/Store.interface";

const AlpaStore = () => {
  const { data, isFetching, isLoading } = UseGetAllStore();
  const router = useRouter();
  return (
    <div className="px-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-content-center">
        {!isLoading &&
          !isFetching &&
          data?.map((item: IStore) => {
            return (
              <div
                className="flex items-center gap-5 shadow-sm rounded-md px-2 border border-slate-200"
                onClick={() => router.push(`/browse/category/${item.id}`)}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${item?.imageName}`}
                  alt=""
                  className="h-20 w-20"
                />
                <div>
                  <h1 className="text-[16px] font-medium">{item.title}</h1>
                  <p className="">{item?.coupons?.length} Coupons</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AlpaStore;
