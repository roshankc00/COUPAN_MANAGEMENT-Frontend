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

const ITEMS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
] as const;

const AlpaStore = () => {
  const [activeAlpa, setactiveAlpa] = useState("A");
  const { data, isFetching, isLoading } = UseGetAllStore();
  const router = useRouter();
  return (
    <div className="px-2">
      <h1 className="text-3xl  font-medium my-10">
        Coupons, Promo Codes & Deals by Store
      </h1>
      <Pagination>
        <PaginationContent className="flex gap-[-1px] flex-wrap">
          {ITEMS.map((itm) => (
            <PaginationItem key={itm}>
              <button
                onClick={() => setactiveAlpa(itm)}
                className={cn(
                  {
                    "bg-black text-white": itm === activeAlpa,
                    "bg-white text-black": itm !== activeAlpa,
                  },
                  " py-1 px-4 rounded-sm shadow-sm"
                )}
              >
                {itm}
              </button>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-content-center">
        {!isLoading &&
          !isFetching &&
          data?.map((item: any) => {
            return (
              <div
                className="flex items-center gap-5 shadow-sm rounded-md px-2 border border-slate-200"
                onClick={() => router.push(`/browse/category/${item.id}`)}
              >
                <img
                  src="https://cdn0.dontpayfull.com/media/logos/size/160x160/brighton.com..jpg?v=20220628144652202906"
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
