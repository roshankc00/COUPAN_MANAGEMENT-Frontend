"use client";
import { useQuery } from "@tanstack/react-query";

import { getAllOffers } from "@/common/api/offer/offer.api";
import {
  IOrderStatus,
  getAllOrderWithStatus,
} from "@/common/api/orders/orders.api";

export const UseGetAllOrderWithStatus = (status: IOrderStatus) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["all-order-with-Status"],
    queryFn: () => getAllOrderWithStatus(status),
  });
  return { data, isFetching, isLoading };
};
