"use client";
import { useQuery } from "@tanstack/react-query";
import { getSingleUser } from "@/common/api/users/user.api";

export const UseGetSingleUser = (id: number) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["get-single-user"],
    queryFn: () => getSingleUser(id),
  });
  return { data, isFetching, isLoading, refetch };
};
