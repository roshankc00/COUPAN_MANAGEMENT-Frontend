"use client";
import { getAllProductsWithType } from "@/common/api/products/products.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetAllProductsWithType = (type: string) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["get-all-products-with-type"],
    queryFn: () => getAllProductsWithType(type),
  });
  return { data, isFetching, isLoading, refetch };
};
