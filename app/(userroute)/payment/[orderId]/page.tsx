// const QrComponent = ({ params }: { params: { orderId: number } }) => {

import React from "react";
import QrComponent from "../_components/Order";
import OrderDetails from "../_components/Order";

const OrderPage = ({ params }: { params: { orderId: number } }) => {
  return (
    <div>
      <OrderDetails orderId={params.orderId} />
    </div>
  );
};

export default OrderPage;
