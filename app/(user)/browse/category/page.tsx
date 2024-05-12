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

export default function BrowseCategoryPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg-px-8">
      <div className="grid grid-cols-2">
        <div className="">Filters</div>
        <div>Coupons</div>
      </div>
    </main>
  );
}
