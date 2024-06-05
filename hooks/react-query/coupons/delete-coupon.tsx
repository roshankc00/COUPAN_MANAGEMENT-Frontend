import { deleteCoupon } from "@/common/api/coupons/coupons.api";
import { client } from "@/components/Provider";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const UseDeleteCoupon = () => {
  const { mutateAsync } = useMutation({
    mutationFn: deleteCoupon,
  });

  const handleDeleteCoupon = async (id: number) => {
    await mutateAsync(id).then(() => {
      toast.success("Deleted successfully");
      client.invalidateQueries({ queryKey: ["coupons"] });
    });
  };

  return handleDeleteCoupon;
};
