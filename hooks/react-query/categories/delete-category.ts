"use client";
import { deleteCategory } from "@/common/api/categories/category.api";
import { client } from "@/components/Provider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const UseDeleteCategory = () => {
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationFn: deleteCategory,
  });
  const handleDeleteCategory = async (id: number) => {
    await mutateAsync(id).then(() => {
      toast.success("Deleted successfully");
      client.invalidateQueries({ queryKey: ["category"] });
      client.invalidateQueries({
        queryKey: ["sub-categories-by-category"],
      });
      router.push("/admin/category");
    });
  };

  return handleDeleteCategory;
};
