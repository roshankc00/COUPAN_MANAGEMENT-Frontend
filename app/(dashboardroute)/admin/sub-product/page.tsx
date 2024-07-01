import React from "react";
import AdminHeader from "../_component/Header";
import SubProductsTable from "./_component/table";

export const metadata = {
  title: "Dashboard-Products NepQue ",
  description: "NepQue: Your CouponPartner",
};
const AdminSubProductPage = () => {
  return (
    <div className="">
      <div className="pt-10">
        <AdminHeader title="Sub-Products" />
      </div>
      <div>
        <SubProductsTable />
      </div>
    </div>
  );
};

export default AdminSubProductPage;
