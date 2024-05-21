import { getReviewStatus } from "@/common/api/review/review.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetReviewStatus = (id: number) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["getReviewStatus"],
    queryFn: () => getReviewStatus(id),
  });
  return { data, isFetching, isLoading };
};
