"use client";
import {
  changePhoneNumberUserApi,
  changeUserName,
} from "@/common/api/users/user.api";
import { client } from "@/components/Provider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const UseChangeUserPhoneNumber = () => {
  const { mutateAsync } = useMutation({
    mutationFn: changePhoneNumberUserApi,
  });
  const router = useRouter();

  const changePhone = async (body: { phoneNumber: string }) => {
    await mutateAsync(body).then(() => {
      toast.success("Phone Number Changed successfully");
      client.invalidateQueries({ queryKey: ["current-user"] });
    });
  };

  return changePhone;
};
