import { useQuery } from "@tanstack/react-query";
import { getLast12MonthStoresAnalytics } from "@/common/api/analytics/analytics.api";

export const UseGetLast12MonthStoresAnalytics = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["last12MonthStores"],
    queryFn: () => getLast12MonthStoresAnalytics(),
  });
  return { data, isFetching, isLoading };
};
