import React from "react";
import OrderComponent from "./_components/OrderComponent";

const AdminSingleOrderPage = ({ params }: { params: { orderId: number } }) => {
  return (
    <div>
      <OrderComponent orderId={+params.orderId} />
    </div>
  );
};

export default AdminSingleOrderPage;
