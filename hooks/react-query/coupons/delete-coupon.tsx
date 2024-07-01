"use client";
import { deleteCoupon } from "@/common/api/coupons/coupons.api";
import { client } from "@/components/Provider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const UseDeleteCoupon = () => {
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationFn: deleteCoupon,
  });

  const handleDeleteCoupon = async (id: number) => {
    await mutateAsync(id).then(() => {
      toast.success("Deleted successfully");
      client.invalidateQueries({ queryKey: ["coupons"] });
      router.push("/admin/coupon");
    });
  };

  return handleDeleteCoupon;
};
