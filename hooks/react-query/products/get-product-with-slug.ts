"use client";
import { getProductWithSlugApi } from "@/common/api/products/products.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetProductwithSlug = (slug: string) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["get-product-with-slug"],
    queryFn: () => getProductWithSlugApi(slug),
  });
  return { data, isFetching, isLoading, refetch };
};
