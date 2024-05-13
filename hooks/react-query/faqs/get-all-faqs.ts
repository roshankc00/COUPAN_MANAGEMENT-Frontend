import { getAllFaqs } from "@/common/api/faqs/faqs.api";
import { getAllStores } from "@/common/api/stores/store.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetAllFAQS = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["faqs"],
    queryFn: () => getAllFaqs(),
  });
  return { data, isFetching, isLoading };
};
