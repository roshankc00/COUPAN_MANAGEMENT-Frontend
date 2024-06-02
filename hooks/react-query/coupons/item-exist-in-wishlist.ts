// existInWatchList

"use client";
import { useQuery } from "@tanstack/react-query";
import { existInWatchList } from "@/common/api/coupons/coupons.api";

export const UseItemExistInWishlist = (couponId: number) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["exist-in-wishlist"],
    queryFn: () => existInWatchList(couponId),
  });
  return { data, isFetching, isLoading, refetch };
};
