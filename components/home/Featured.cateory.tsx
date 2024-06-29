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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-5 place-content-center">
        {isLoading &&
          isFetching &&
          new Array(12)
            .fill(null)
            .map((el, index) => <CategorySkeleton key={index} />)}
        {!isLoading &&
          !isFetching &&
          data?.map((item: ICategory) => (
            <CategoryCard key={item.id} category={item} />
          ))}
      </div>
    </div>
  );
};

export default FeatureCategory;
