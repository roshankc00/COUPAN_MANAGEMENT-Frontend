"use client";
import { getCouponwithSlugApi } from "@/common/api/coupons/coupons.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetCouponInfoWithSlug = (slug: string | null) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["single-coupon-with-slug"],
    queryFn: () => getCouponwithSlugApi(slug),
    enabled: !!slug,
  });
  return { data, isFetching, isLoading, refetch };
};
