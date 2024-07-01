"use client";
import { rejectOrder } from "@/common/api/orders/orders.api";
import { client } from "@/components/Provider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const UseHandleRejectOrder = () => {
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationFn: rejectOrder,
  });

  const handleDelete = async (id: number) => {
    mutateAsync(id).then(() => {
      toast.success("Rejected the Status");
      client.invalidateQueries({ queryKey: ["get-all-orders"] });
      client.invalidateQueries({ queryKey: ["all-order-with-Status"] });
      router.push("/admin/orders");
    });
  };

  return handleDelete;
};
