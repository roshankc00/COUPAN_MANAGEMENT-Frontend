import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "../../common/api/category/category.api";

export const UseGetAllCategory = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["category"],
    queryFn: () => getAllCategory(),
  });
  return { data, isFetching, isLoading };
};
