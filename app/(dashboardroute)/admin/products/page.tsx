import React from "react";
import AdminHeader from "../_component/Header";
import ProductsTable from "./_component/table";

export const metadata = {
  title: "Dashboard-Products NepQue ",
  description: "NepQue: Your CouponPartner",
};
const AdminProductPage = () => {
  return (
    <div>
      <div className="mt-10 pr-24 -mb-[15px]">
        <AdminHeader title="Products" />
      </div>
      <div>
        <ProductsTable />
      </div>
    </div>
  );
};

export default AdminProductPage;
