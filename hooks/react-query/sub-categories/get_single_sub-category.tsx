import { useQuery } from "@tanstack/react-query";
import { getSingleSubcategory } from "@/common/api/sub-categories/sub-category.api";

export const UseGetSingleSubCategory = (id: number) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["getSingleSubcategory"],
    queryFn: () => getSingleSubcategory(id),
  });
  return { data, isFetching, isLoading, refetch };
};
