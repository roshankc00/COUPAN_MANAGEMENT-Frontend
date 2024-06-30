import React from "react";
import AdminHeader from "../_component/Header";
import ProductsTable from "./_component/table";

export const metadata = {
  title: "Dashboard-Products NepQue ",
  description: "NepQue: Your CouponPartner",
};
const AdminProductPage = () => {
  return (
    <div className="">
      <div className="pt-10">
        <AdminHeader title="Products" />
      </div>
      <div>
        <ProductsTable />
      </div>
    </div>
  );
};

export default AdminProductPage;
