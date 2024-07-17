import { useQuery } from "@tanstack/react-query";
import { getAllCategoryWithSlugApi } from "../../../common/api/categories/category.api";

export const UseGetSingleCategoryWithSlug = (slug: string) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["getAllCategoryWithSlugApi"],
    queryFn: () => getAllCategoryWithSlugApi(slug),
  });
  return { data, isFetching, isLoading, refetch };
};
