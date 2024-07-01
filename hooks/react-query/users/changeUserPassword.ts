"use client";
import { changePassword, changeUserName } from "@/common/api/users/user.api";
import { client } from "@/components/Provider";
import { IChangePasswordBody } from "@/interfaces/user.interface";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const UseChangeUserPassword = () => {
  const { mutateAsync } = useMutation({
    mutationFn: changePassword,
  });
  const router = useRouter();

  const changeUserPassword = async (body: IChangePasswordBody) => {
    await mutateAsync(body).then(() => {
      toast.success("Password Changed successfully");
      client.invalidateQueries({ queryKey: ["current-user"] });
    });
  };

  return changeUserPassword;
};
