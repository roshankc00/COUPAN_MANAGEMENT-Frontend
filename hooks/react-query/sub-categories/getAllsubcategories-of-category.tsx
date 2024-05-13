import { useQuery } from "@tanstack/react-query";
import { getAllSubcategoriesOfParticularCategory } from "@/common/api/sub-categories/sub-category.api";

export const UseGetAllSubCategoryOfParticularCategory = (
  categoryId: number
) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["sub-categories-by-category"],
    queryFn: () => getAllSubcategoriesOfParticularCategory(categoryId),
  });
  return { data, isFetching, isLoading, refetch };
};
