import { getAllStores, getSearchData } from "@/common/api/stores/store.api";
import { useQuery } from "@tanstack/react-query";

export const UseSeachCategoryStore = (text: string) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["search-store-category"],
    queryFn: () => getSearchData(text),
  });
  return { data, isFetching, isLoading, refetch };
};
