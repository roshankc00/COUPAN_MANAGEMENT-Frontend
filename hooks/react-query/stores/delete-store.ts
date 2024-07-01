"use client";
import { deleteStore } from "@/common/api/blogs/blogs.api";
import { client } from "@/components/Provider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const UseDeleteStore = () => {
  const { mutateAsync } = useMutation({
    mutationFn: deleteStore,
  });
  const router = useRouter();

  const handleDelete = async (id: number) => {
    await mutateAsync(id).then(() => {
      router.push("/admin/store");
      toast.success("Deleted successfully");
      client.invalidateQueries({ queryKey: ["store"] });
    });
  };

  return handleDelete;
};
