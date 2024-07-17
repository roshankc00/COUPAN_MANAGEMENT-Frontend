// getAllProductforUser

"use client";
import {
  getAllProductforUser,
  getAllProducts,
} from "@/common/api/products/products.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetAllProductsforUser = () => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["get-all-products-for-user"],
    queryFn: () => getAllProductforUser(),
  });
  return { data, isFetching, isLoading, refetch };
};
