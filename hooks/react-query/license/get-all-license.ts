import { getLicenses } from "@/common/api/license/license.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetAllLicenses = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["get-all-licenses"],
    queryFn: () => getLicenses(),
  });
  return { data, isFetching, isLoading };
};
