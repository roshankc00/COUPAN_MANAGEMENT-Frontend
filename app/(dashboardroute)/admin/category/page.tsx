import React from "react";
import CategoryTable from "./_component/table";
import AdminHeader from "../_component/Header";

export const metadata = {
  title: "Dashboard-Category | NepQue ",
  description: "NepQue: Your CouponPartner",
};

const CategoryPage = () => {
  return (
    <div className="">
      <div className="mt-10 pr-24 -mb-[15px]">
        <AdminHeader title="Category" />
      </div>
      <div>
        <CategoryTable />
      </div>
    </div>
  );
};

export default CategoryPage;
