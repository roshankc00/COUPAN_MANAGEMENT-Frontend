// getAllOrder
import { getAllOrder } from "@/common/api/orders/orders.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetAllOrders = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["get-all-orders"],
    queryFn: () => getAllOrder(),
  });
  return { data, isFetching, isLoading };
};
