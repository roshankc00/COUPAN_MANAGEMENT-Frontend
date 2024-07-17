"use client";
import { UseGetSingleCategoryWithSlug } from "@/hooks/react-query/categories/get-category-withslug";
import { isPending } from "@reduxjs/toolkit";
import React from "react";
import SideFilter from "./SideFilter";
import { useRouter } from "next/navigation";

type Props = {
  slug: string;
};

const CategoryCoupon: React.FC<Props> = ({ slug }) => {
  const router = useRouter();
  const { data, isFetching, isLoading } = UseGetSingleCategoryWithSlug(slug);
  if (!data && !isFetching && !isLoading) {
    router.back();
  }
  return (
    <div>
      {!isPending && !isFetching && data && (
        <SideFilter categoryId={data?.id} />
      )}
    </div>
  );
};

export default CategoryCoupon;
