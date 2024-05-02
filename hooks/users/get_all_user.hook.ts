import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/common/api/users/user.api";

export const UseGetAllUsers = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });
  return { data, isFetching, isLoading };
};
