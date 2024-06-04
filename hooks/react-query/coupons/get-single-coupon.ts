// getSingleCoupon

"use client";
import { useQuery } from "@tanstack/react-query";
import { getSingleCoupon } from "@/common/api/coupons/coupons.api";

export const UseGetSingleCoupon = (id: number) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["getSingleCoupon"],
    queryFn: () => getSingleCoupon(id),
  });
  return { data, isFetching, isLoading, refetch };
};
