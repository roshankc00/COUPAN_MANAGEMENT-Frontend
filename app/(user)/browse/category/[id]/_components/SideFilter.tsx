"use client";
import { UseGetAllSubCategoryOfParticularCategory } from "@/hooks/react-query/sub-categories/getAllsubcategories-of-category";
import React from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const SideFilter = ({ categoryId }: { categoryId: number }) => {
  const { data, isLoading, isFetching } =
    UseGetAllSubCategoryOfParticularCategory(categoryId);
  return (
    <div className="shadow-sm p-3 rounded-md bg-slate-50 ">
      <h1 className="mb-3 font-medium">All SubCategory</h1>
      <Separator />
      <div className="mt-3">
        {data &&
          data?.map((item: any) => {
            return (
              <Link
                href={`browse/category/${item.id}`}
                className="capitalize text-[16px] hover:underline"
                key={item.id}
              >
                {item.title}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default SideFilter;
