import { getSingleOrder } from "@/common/api/orders/orders.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetSingleOrder = (id: number) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["get-single-order"],
    queryFn: () => getSingleOrder(id),
  });
  return { data, isFetching, isLoading, refetch };
};
