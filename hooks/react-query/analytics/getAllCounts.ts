import { useQuery } from "@tanstack/react-query";
import { getallCounts } from "@/common/api/analytics/analytics.api";

export const UseGetAllCounts = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["all-counts"],
    queryFn: () => getallCounts(),
  });
  return { data, isFetching, isLoading };
};
