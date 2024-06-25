"use client";
import { getAllMyOrder, getAllOrder } from "@/common/api/orders/orders.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetMyOrders = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["get-all-my-orders"],
    queryFn: () => getAllMyOrder(),
  });
  return { data, isFetching, isLoading };
};
