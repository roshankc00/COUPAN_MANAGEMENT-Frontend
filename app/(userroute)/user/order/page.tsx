import React from "react";
import OrdersTable from "./_component/table";
import LoginUserOnly from "@/components/permissions/LoginUserOnly";

const AllMyOrders = () => {
  return (
    <LoginUserOnly>
      <OrdersTable />
    </LoginUserOnly>
  );
};

export default AllMyOrders;
