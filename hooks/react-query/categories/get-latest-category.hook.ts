// getLatestcategories

"use client";
import { useQuery } from "@tanstack/react-query";
import { getLatestcategories } from "@/common/api/categories/category.api";

export const UseGetLatesCategories = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["latest-categories"],
    queryFn: () => getLatestcategories(),
  });
  return { data, isFetching, isLoading };
};
