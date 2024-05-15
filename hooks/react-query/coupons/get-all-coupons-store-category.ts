"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllCouponsOfCategoryAndStore } from "@/common/api/coupons/coupons.api";

export const UseGetAllCouponsOfCatStore = (
  categoryIds: number[],
  storeIds: number[],
  page: number,
  pageSize: number
) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["cat-store-coupons"],
    queryFn: () =>
      getAllCouponsOfCategoryAndStore(categoryIds, storeIds, page, pageSize),
  });
  return { data, isFetching, isLoading, refetch };
};
