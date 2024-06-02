import { getSingleAffilateLink } from "@/common/api/affilate-link/affilate-link.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetSingleAffilateLink = (id: number) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["single-affilateLink"],
    queryFn: () => getSingleAffilateLink(id),
  });
  return { data, isFetching, isLoading };
};
