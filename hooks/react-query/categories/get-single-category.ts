// getSingleCategory

import { useQuery } from "@tanstack/react-query";
import { getSingleCategory } from "../../../common/api/categories/category.api";

export const UseGetSingleCategory = (id: number) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["getSingleCategory"],
    queryFn: () => getSingleCategory(id),
  });
  return { data, isFetching, isLoading, refetch };
};
