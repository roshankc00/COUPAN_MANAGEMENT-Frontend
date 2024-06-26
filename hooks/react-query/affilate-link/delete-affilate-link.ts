"use client";

import { deleteAffilateLink } from "@/common/api/affilate-link/affilate-link.api";
import { client } from "@/components/Provider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useDeleteAffialatedLink = () => {
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationFn: deleteAffilateLink,
  });

  const handleDelete = async (id: number) => {
    await mutateAsync(id).then(() => {
      toast.success("Deleted successfully");
      client.invalidateQueries({ queryKey: ["affilateLink"] });
      router.push("/admin/affilate-link");
    });
  };

  return handleDelete;
};
