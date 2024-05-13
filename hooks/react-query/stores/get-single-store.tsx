import { getSingleStoreInfo } from "@/common/api/stores/store.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetStoreInfo = (id: number) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["single-store"],
    queryFn: () => getSingleStoreInfo(id),
  });
  return { data, isFetching, isLoading };
};
