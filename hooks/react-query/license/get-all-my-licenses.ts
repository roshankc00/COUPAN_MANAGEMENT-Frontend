"use client";
import { getMyLicenses } from "@/common/api/license/license.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetMyLicenses = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["get-all-my-licenses"],
    queryFn: () => getMyLicenses(),
  });
  return { data, isFetching, isLoading };
};
