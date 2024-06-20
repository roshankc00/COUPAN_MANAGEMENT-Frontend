import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../../common/api/categories/category.api";
import { getAllSubProducts } from "@/common/api/sub-products/subproduct.api";

export const UseGetAllSubProducts = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["sub-products"],
    queryFn: () => getAllSubProducts(),
  });
  return { data, isFetching, isLoading };
};
