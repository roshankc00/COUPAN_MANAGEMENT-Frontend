import React from "react";
import FaqsTable from "./_component/table";
import AdminHeader from "../_component/Header";

export const metadata = {
  title: "Dashboard-Orders | NepQue ",
  description: "NepQue: Your CouponPartner",
};
const page = () => {
  return (
    <div>
      <div className="mt-10 pr-24 -mb-[15px]">
        <AdminHeader title="Orders" />
      </div>
      <div>
        <FaqsTable />
      </div>
    </div>
  );
};

export default page;
