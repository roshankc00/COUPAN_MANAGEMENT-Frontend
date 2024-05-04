import { useQuery } from "@tanstack/react-query";
import { getLast12MonthCoponsAnalytics } from "@/common/api/analytics/analytics.api";

export const UseGetLast12MonthCouponsAnalytics = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["last12MonthCoupons"],
    queryFn: () => getLast12MonthCoponsAnalytics(),
  });
  return { data, isFetching, isLoading };
};
