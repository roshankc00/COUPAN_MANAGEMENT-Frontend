import { useQuery } from "@tanstack/react-query";
import { getStoreWithOutAffilatedLink } from "../../../common/api/stores/store.api";

export const UseGetAllStoreWithOutAffilatedLink = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["store"],
    queryFn: () => getStoreWithOutAffilatedLink(),
  });
  return { data, isFetching, isLoading };
};
