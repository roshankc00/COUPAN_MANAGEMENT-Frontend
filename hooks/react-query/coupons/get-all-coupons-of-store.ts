import { useQuery } from "@tanstack/react-query";
import { getAllCouponsOfStore } from "@/common/api/coupons/coupons.api";

export const UseGetAllCouponsOfStore = (id: number) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["store-coupons"],
    queryFn: () => getAllCouponsOfStore(id),
  });
  return { data, isFetching, isLoading };
};
