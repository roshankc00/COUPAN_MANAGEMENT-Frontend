import { getAllAffilateLinks } from "@/common/api/affilate-link/affilate-link.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetAllAffilateLink = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["affilateLink"],
    queryFn: () => getAllAffilateLinks(),
  });
  return { data, isFetching, isLoading };
};
