import { getAllStores } from "@/common/api/stores/store.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetAllStore = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["store"],
    queryFn: () => getAllStores(),
  });
  return { data, isFetching, isLoading };
};
