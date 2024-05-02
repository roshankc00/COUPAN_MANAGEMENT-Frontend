import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../common/api/categories/category.api";

export const UseGetAllCategory = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["category"],
    queryFn: () => getAllCategories(),
  });
  return { data, isFetching, isLoading };
};
