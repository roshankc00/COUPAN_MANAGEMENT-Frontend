"use client";
import Couponcard from "@/components/Coupon.card";
import { UseGetAllSubCategoryOfParticularCategory } from "@/hooks/react-query/sub-categories/getAllsubcategories-of-category";
import React from "react";

const ListItem = ({ categoryId }: { categoryId: number }) => {
  const { data, isLoading, isFetching } =
    UseGetAllSubCategoryOfParticularCategory(categoryId);
  return (
    <div>
      {!isLoading && !isFetching && data?.map((item: any) => <Couponcard />)}
    </div>
  );
};

export default ListItem;
