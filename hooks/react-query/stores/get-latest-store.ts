// getLatestStore

import { getLatestStore } from "@/common/api/stores/store.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetLatestStores = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["latest-stores"],
    queryFn: () => getLatestStore(),
  });
  return { data, isFetching, isLoading };
};
