"use client";
import { UseGetSingleOrder } from "@/hooks/react-query/orders/get-single-order";
import React from "react";
import OrderDetails from "./OrderDetails";

type Props = {
  orderId: number;
};

const OrderComponent: React.FC<Props> = ({ orderId }) => {
  const { data, isFetching, isLoading } = UseGetSingleOrder(+orderId);
  return <div>{!isFetching && !isLoading && <OrderDetails data={data} />}</div>;
};

export default OrderComponent;
