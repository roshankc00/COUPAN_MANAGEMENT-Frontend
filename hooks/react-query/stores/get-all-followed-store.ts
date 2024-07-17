"use client";
import { getAllFollowedStore } from "@/common/api/stores/store.api";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
export const UseGetAllFollowedStore = () => {
  const { isLogedInStatus } = useSelector((state: IRootState) => state.auth);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["followed-store"],
    queryFn: () => getAllFollowedStore(),
    enabled: isLogedInStatus,
  });
  return { data, isFetching, isLoading };
};
