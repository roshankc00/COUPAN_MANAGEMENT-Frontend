import { getAllFaqs } from "@/common/api/faqs/faqs.api";
import { getAllHomeDetails } from "@/common/api/home/home.api";
import { getAllStores } from "@/common/api/stores/store.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetAllHomeDetails = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["home-details"],
    queryFn: () => getAllHomeDetails(),
  });
  return { data, isFetching, isLoading };
};
