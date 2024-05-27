import { getAFaq, getAllFaqs } from "@/common/api/faqs/faqs.api";
import { getAllStores } from "@/common/api/stores/store.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetASingleFAQ = (id: number) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["single-faqs"],
    queryFn: () => getAFaq(id),
  });
  return { data, isFetching, isLoading };
};
