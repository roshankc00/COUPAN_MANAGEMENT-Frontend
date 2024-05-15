"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../../common/api/categories/category.api";
import { getAllCoupons } from "@/common/api/coupons/coupons.api";

export const UseGetAllCoupons = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => getAllCoupons(),
  });
  return { data, isFetching, isLoading };
};
