import React from "react";
import CategoryTable from "./_component/table";
import AdminHeader from "../_component/Header";

export const metadata = {
  title: "Dashboard-Store | NepQue ",
  description: "NepQue: Your CouponPartner",
};

const StoresPage = () => {
  return (
    <div className="">
      <div className="pt-10">
        <AdminHeader title="Store" />
      </div>
      <div>
        <CategoryTable />
      </div>
    </div>
  );
};

export default StoresPage;
