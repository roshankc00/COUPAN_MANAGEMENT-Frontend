import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/common/api/users/user.api";

export const UseGetCurrentUser = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => getCurrentUser(),
  });
  return { data, isFetching, isLoading };
};
