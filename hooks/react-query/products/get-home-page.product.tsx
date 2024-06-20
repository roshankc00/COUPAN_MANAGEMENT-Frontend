"use client";
import { getAllHomePageProducts } from "@/common/api/products/products.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetHomePageProducts = () => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["get-home-products"],
    queryFn: () => getAllHomePageProducts(),
  });
  return { data, isFetching, isLoading, refetch };
};
