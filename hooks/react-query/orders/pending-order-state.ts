import { pendingOrder } from "@/common/api/orders/orders.api";
import { client } from "@/components/Provider";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const UseHandlePendingOrder = () => {
  const { mutateAsync: handlePendingApi } = useMutation({
    mutationFn: pendingOrder,
  });

  const handlePendingState = async (id: number) => {
    handlePendingApi(id).then(() => {
      client.invalidateQueries({ queryKey: ["get-all-orders"] });
      client.invalidateQueries({ queryKey: ["all-order-with-Status"] });
      toast.success("Change status to Pending");
    });
  };

  return handlePendingState;
};
