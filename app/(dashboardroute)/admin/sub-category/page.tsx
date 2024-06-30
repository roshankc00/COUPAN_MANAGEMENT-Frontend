import React from "react";
import AdminHeader from "../_component/Header";
import SubCategoryTable from "./_component/table";

export const metadata = {
  title: "Sub-category | NepQue ",
  description: "NepQue: Your CouponPartner",
};
const SubCategoryPage = () => {
  return (
    <div className="">
      <div className="pt-10">
        <AdminHeader title="Sub-Category" />
      </div>
      <div>
        <SubCategoryTable />
      </div>
    </div>
  );
};

export default SubCategoryPage;
