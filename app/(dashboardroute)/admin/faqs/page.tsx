import React from "react";
import FaqsTable from "./_component/table";
import AdminHeader from "../_component/Header";

export const metadata = {
  title: "Dashboard-Faqs | NepQue ",
  description: "NepQue: Your CouponPartner",
};
const page = () => {
  return (
    <div className="">
      <div className="pt-10">
        <AdminHeader title="faqs" />
      </div>
      <div>
        <FaqsTable />
      </div>
    </div>
  );
};

export default page;
