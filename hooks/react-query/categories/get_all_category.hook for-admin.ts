import { useQuery } from "@tanstack/react-query";
import {
  getAllCategories,
  getAllCategoryForAdmin,
} from "../../../common/api/categories/category.api";

export const UseGetAllCategoryForAdmin = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["admin-category"],
    queryFn: () => getAllCategoryForAdmin(),
  });
  return { data, isFetching, isLoading };
};
