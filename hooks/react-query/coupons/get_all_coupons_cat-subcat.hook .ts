"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllCouponsOfCategoryAndSubcategory } from "@/common/api/coupons/coupons.api";

export const UseGetAllCouponsOfCatSubcat = (
  categorySlug: string,
  subCategoryIds: number[],
  page: number,
  pageSize: number
) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["cat-subcat-coupons"],
    queryFn: () =>
      getAllCouponsOfCategoryAndSubcategory(
        categorySlug,
        subCategoryIds,
        page,
        pageSize
      ),
  });
  return { data, isFetching, isLoading, refetch };
};
