"use client";
import { getAllProducts } from "@/common/api/products/products.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetAllProducts = () => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["get-all-products"],
    queryFn: () => getAllProducts(),
  });
  return { data, isFetching, isLoading, refetch };
};
