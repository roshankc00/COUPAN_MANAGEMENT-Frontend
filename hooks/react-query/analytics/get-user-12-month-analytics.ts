import { useQuery } from "@tanstack/react-query";
import { getLast12MonthUsersAnalytics } from "@/common/api/analytics/analytics.api";

export const UseGetLast12MonthUsersAnalytics = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["last12MonthUsers"],
    queryFn: () => getLast12MonthUsersAnalytics(),
  });
  return { data, isFetching, isLoading };
};
