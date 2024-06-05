import { rejectOrder } from "@/common/api/orders/orders.api";
import { client } from "@/components/Provider";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const UseHandleRejectOrder = () => {
  const { mutateAsync } = useMutation({
    mutationFn: rejectOrder,
  });

  const handleDelete = async (id: number) => {
    mutateAsync(id).then(() => {
      toast.success("Rejected the Status");
      client.invalidateQueries({ queryKey: ["get-all-orders"] });
      client.invalidateQueries({ queryKey: ["all-order-with-Status"] });
    });
  };

  return handleDelete;
};
