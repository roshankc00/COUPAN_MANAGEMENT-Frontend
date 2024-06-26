import { getAllNotAssignedLicenses } from "@/common/api/license/license.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetAllNotAssignedLicenses = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["get-all-not-assigned-licenses"],
    queryFn: () => getAllNotAssignedLicenses(),
  });
  return { data, isFetching, isLoading };
};
