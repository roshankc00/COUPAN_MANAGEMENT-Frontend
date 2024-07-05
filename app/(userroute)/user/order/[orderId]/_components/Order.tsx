"use client";
import { UseGetSingleOrder } from "@/hooks/react-query/orders/get-single-order";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import QrComponent from "./OrderDetails";
type Props = {
  orderId: number;
};

const OrderDetails: React.FC<Props> = ({ orderId }) => {
  const router = useRouter();
  const { data, refetch, isLoading, isFetching } = UseGetSingleOrder(orderId);
  if (!data && !isFetching && isLoading) {
    router.back();
  }
  useEffect(() => {
    refetch();
  }, [orderId]);
  return (
    <div>
      {!isLoading && !isFetching && (
        <QrComponent orderId={orderId} orderDetails={data} />
      )}
    </div>
  );
};

export default OrderDetails;
