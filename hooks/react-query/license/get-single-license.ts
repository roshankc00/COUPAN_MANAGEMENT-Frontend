import {
  getLicenses,
  getSingleLicense,
} from "@/common/api/license/license.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetSingleLicense = (id: number) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["get-single-license"],
    queryFn: () => getSingleLicense(id),
  });
  return { data, isFetching, isLoading };
};
