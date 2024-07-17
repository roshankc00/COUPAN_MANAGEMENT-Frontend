"use client";
import { changeProductStatus } from "@/common/api/products/products.api";
import { client } from "@/components/Provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const ChangeStatusProduct: React.FC<{ id: number; isPublished: boolean }> = ({
  id,
  isPublished,
}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: changeProductStatus,
    onSuccess() {
      toast.success("Status changed successfully");
      client.invalidateQueries({
        queryKey: ["get-all-products"],
      });
      client.invalidateQueries({
        queryKey: ["get-single-product"],
      });
    },
  });
  return (
    <div>
      <Button
        className={cn({
          " bg-red-600 ms-10": !isPublished,
          " bg-green-700 ms-10": isPublished,
        })}
        disabled={isPending}
        onClick={() => mutateAsync(id)}
      >
        Change Status
      </Button>
    </div>
  );
};

export default ChangeStatusProduct;
