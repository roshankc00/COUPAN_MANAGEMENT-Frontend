"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../../common/api/categories/category.api";
import {
  getAllCoupons,
  getAllUserWishlistCoupons,
} from "@/common/api/coupons/coupons.api";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";

export const UseGetAllUserWishlistCoupons = (status: string) => {
  const { isLogedInStatus } = useSelector((state: IRootState) => state.auth);
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["wishlistdata"],
    queryFn: () => getAllUserWishlistCoupons(status),
    enabled: isLogedInStatus,
  });
  return { data, isFetching, isLoading, refetch };
};
