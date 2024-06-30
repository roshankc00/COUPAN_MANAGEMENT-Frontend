import React from "react";
import AdminHeader from "../_component/Header";
import OrdersTable from "./_component/table";

export const metadata = {
  title: "Dashboard-Orders | NepQue ",
  description: "NepQue: Your CouponPartner",
};
const page = () => {
  return (
    <div className="">
      <div className="pt-10">
        <AdminHeader title="Orders" />
      </div>
      <div>
        <OrdersTable />
      </div>
    </div>
  );
};

export default page;
