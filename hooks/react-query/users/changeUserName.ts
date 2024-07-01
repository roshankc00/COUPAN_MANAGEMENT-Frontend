"use client";
import { changeUserName } from "@/common/api/users/user.api";
import { client } from "@/components/Provider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const UseChangeUserName = () => {
  const { mutateAsync } = useMutation({
    mutationFn: changeUserName,
  });
  const router = useRouter();

  const changeName = async (body: { name: string }) => {
    await mutateAsync(body).then(() => {
      toast.success("Name Changed successfully");
      client.invalidateQueries({ queryKey: ["current-user"] });
    });
  };

  return changeName;
};
