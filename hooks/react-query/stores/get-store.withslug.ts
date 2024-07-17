"use client";
import {
  getSingleStoreInfo,
  getStoreWithSlug,
} from "@/common/api/stores/store.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetStoreInfoWithSlug = (slug: string) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["single-store-with-slug"],
    queryFn: () => getStoreWithSlug(slug),
  });
  return { data, isFetching, isLoading, refetch };
};
