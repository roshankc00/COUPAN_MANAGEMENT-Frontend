"use client";
import { deleteLicense } from "@/common/api/license/license.api";
import { client } from "@/components/Provider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const UseDeleteLicense = () => {
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationFn: deleteLicense,
  });

  const handleDeleteLicense = async (id: number) => {
    await mutateAsync(id).then(() => {
      toast.success("Deleted successfully");
      client.invalidateQueries({ queryKey: ["get-all-licenses"] });
      router.push("/admin/license");
    });
  };

  return handleDeleteLicense;
};
