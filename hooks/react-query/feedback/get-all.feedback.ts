"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllReviews } from "@/common/api/review/review.api";
import { getAllFeedback } from "@/common/api/feedback/feedback.api";

export const UseGetAllFeedback = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["all-feedback"],
    queryFn: () => getAllFeedback(),
  });
  return { data, isFetching, isLoading };
};
