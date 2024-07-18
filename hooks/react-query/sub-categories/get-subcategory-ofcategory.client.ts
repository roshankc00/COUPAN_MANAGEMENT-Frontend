import { useQuery } from "@tanstack/react-query";
import {
  getAllSubcategoriesCategoryInClient,
  getSingleSubcategory,
} from "@/common/api/sub-categories/sub-category.api";

export const UseGetSingleSubCategorywithSlug = (slug: string) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["getSingleSubcategory"],
    queryFn: () => getAllSubcategoriesCategoryInClient(slug),
  });
  return { data, isFetching, isLoading, refetch };
};
