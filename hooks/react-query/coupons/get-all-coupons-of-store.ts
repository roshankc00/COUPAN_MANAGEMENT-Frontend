"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllCouponsOfStore } from "@/common/api/coupons/coupons.api";

export const UseGetAllCouponsOfStore = (
  storeSlug: string,
  page: number,
  noOfPages: number
) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["store-coupons"],
    queryFn: () => getAllCouponsOfStore(storeSlug, page, noOfPages),
  });
  return { data, isFetching, isLoading, refetch };
};
