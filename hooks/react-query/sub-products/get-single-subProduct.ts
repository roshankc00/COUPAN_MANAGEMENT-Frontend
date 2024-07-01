import { useQuery } from "@tanstack/react-query";
import { getSingleSubProduct } from "@/common/api/sub-products/subproduct.api";

export const UseGetSingleSubProduct = (id: number) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["sub-products"],
    queryFn: () => getSingleSubProduct(id),
  });
  return { data, isFetching, isLoading, refetch };
};
