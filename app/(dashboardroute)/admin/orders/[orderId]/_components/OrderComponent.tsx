"use client";
import { UseGetSingleOrder } from "@/hooks/react-query/orders/get-single-order";
import React, { useEffect } from "react";
import OrderDetails from "./OrderDetails";

type Props = {
  orderId: number;
};

const OrderComponent: React.FC<Props> = ({ orderId }) => {
  const { data, isFetching, isLoading, refetch } = UseGetSingleOrder(+orderId);
  useEffect(() => {
    refetch();
  }, [orderId]);
  return <div>{!isFetching && !isLoading && <OrderDetails data={data} />}</div>;
};

export default OrderComponent;
