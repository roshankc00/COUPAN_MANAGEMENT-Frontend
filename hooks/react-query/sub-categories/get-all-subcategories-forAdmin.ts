import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../../common/api/categories/category.api";
import { getAllSubCategoriesForAdmin } from "@/common/api/sub-categories/sub-category.api";

export const UseGetAllSubCategoryForAdmin = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["admin-sub-categories"],
    queryFn: () => getAllSubCategoriesForAdmin(),
  });
  return { data, isFetching, isLoading };
};
