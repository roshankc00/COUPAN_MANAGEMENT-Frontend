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
    </div>
  );
};

export default AlpaStore;
