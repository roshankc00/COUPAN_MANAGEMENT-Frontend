import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../../common/api/categories/category.api";
import { getAllSubCategories } from "@/common/api/sub-categories/sub-category.api";

export const UseGetAllSubCategory = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["sub-categories"],
    queryFn: () => getAllSubCategories(),
  });
  return { data, isFetching, isLoading };
};
