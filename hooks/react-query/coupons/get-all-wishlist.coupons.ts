"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../../common/api/categories/category.api";
import {
  getAllCoupons,
  getAllUserWishlistCoupons,
} from "@/common/api/coupons/coupons.api";

export const UseGetAllUserWishlistCoupons = (status: string) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["wishlistdata"],
    queryFn: () => getAllUserWishlistCoupons(status),
  });
  return { data, isFetching, isLoading, refetch };
};
