// getLatestCoupons

"use client";
import { useQuery } from "@tanstack/react-query";
import {
  getLatestCoupons,
  getSingleCoupon,
} from "@/common/api/coupons/coupons.api";

export const UseGetLatesCoupons = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["latest-coupons"],
    queryFn: () => getLatestCoupons(),
  });
  return { data, isFetching, isLoading };
};
