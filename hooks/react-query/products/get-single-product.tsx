"use client";
import { getSingleProduct } from "@/common/api/products/products.api";

import { useQuery } from "@tanstack/react-query";

export const UseGetSingleProduct = (id: number) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["get-single-product"],
    queryFn: () => getSingleProduct(id),
  });
  return { data, isFetching, isLoading };
};
