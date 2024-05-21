"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllReviews } from "@/common/api/review/review.api";

export const UseGetAllReviews = (
  page: number,
  noOfPages: number,
  couponId: number,
  rating: number | null,
  searchText: string | null
) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: () => getAllReviews(page, noOfPages, couponId, rating, searchText),
  });
  return { data, isFetching, isLoading, refetch };
};
