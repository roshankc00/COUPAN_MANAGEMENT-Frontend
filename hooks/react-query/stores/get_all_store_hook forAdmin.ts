import {
  getAllStoreForAdmin,
  getAllStores,
} from "@/common/api/stores/store.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetAllStoreForAdmin = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["admin-store"],
    queryFn: () => getAllStoreForAdmin(),
  });
  return { data, isFetching, isLoading };
};
