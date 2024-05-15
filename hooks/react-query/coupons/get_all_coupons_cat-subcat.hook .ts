"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllCouponsOfCategoryAndSubcategory } from "@/common/api/coupons/coupons.api";

export const UseGetAllCouponsOfCatSubcat = (
  categoryId: number,
  subCategoryIds: number[],
  page: number,
  pageSize: number
) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["cat-subcat-coupons"],
    queryFn: () =>
      getAllCouponsOfCategoryAndSubcategory(
        categoryId,
        subCategoryIds,
        page,
        pageSize
      ),
  });
  return { data, isFetching, isLoading, refetch };
};
