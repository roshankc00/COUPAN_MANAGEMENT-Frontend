"use client";
import { UseGetLatesCategories } from "@/hooks/react-query/categories/get-latest-category.hook";
import React from "react";
import CouponSkeletonCard from "../cards/CouponSkeleton";
import CategoryCard from "../cards/Category.card";
import { ICategory } from "@/interfaces/category.interface";
import CategorySkeleton from "../cards/CategorySkeleton";

const FeatureCategory = () => {
  const { data, isFetching, isLoading } = UseGetLatesCategories();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg-px-8 my-10">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-5 ">
        {isLoading &&
          isFetching &&
          new Array(12)
            .fill(null)
            .map((el, index) => <CategorySkeleton key={index} />)}
        {!isLoading &&
          !isFetching &&
          data?.map((item: ICategory) => <CategoryCard category={item} />)}
      </div>
    </div>
  );
};

export default FeatureCategory;