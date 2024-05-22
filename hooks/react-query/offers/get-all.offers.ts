"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllReviews } from "@/common/api/review/review.api";
import { getAllFeedback } from "@/common/api/feedback/feedback.api";
import { getAllOffers } from "@/common/api/offer/offer.api";

export const UseGetAllOffers = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["all-offers"],
    queryFn: () => getAllOffers(),
  });
  return { data, isFetching, isLoading };
};
