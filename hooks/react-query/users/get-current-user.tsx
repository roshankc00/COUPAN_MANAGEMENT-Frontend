"use client";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/common/api/users/user.api";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";

export const UseGetCurrentUser = () => {
  const { isLogedInStatus } = useSelector((state: IRootState) => state.auth);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => getCurrentUser(),
    enabled: isLogedInStatus,
  });
  return { data, isFetching, isLoading };
};
