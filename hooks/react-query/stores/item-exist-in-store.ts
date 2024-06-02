// existInWatchList

"use client";
import { useQuery } from "@tanstack/react-query";
import { existInWatchList } from "@/common/api/coupons/coupons.api";
import { existInFollowerList } from "@/common/api/stores/store.api";

export const UseItemExistInFollowerlist = (storeId: number) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["exist-in-followelist"],
    queryFn: () => existInFollowerList(storeId),
  });
  return { data, isFetching, isLoading };
};
