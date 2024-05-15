"use client";
import { getAllFollowedStore } from "@/common/api/stores/store.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetAllFollowedStore = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["followed-store"],
    queryFn: () => getAllFollowedStore(),
  });
  return { data, isFetching, isLoading };
};
