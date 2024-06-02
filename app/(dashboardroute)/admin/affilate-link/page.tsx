import React from "react";
import AdminHeader from "../_component/Header";
import AffilateLinkTable from "./_component/table";

export const metadata = {
  title: "Sub-category | NepQue ",
  description: "NepQue: Your CouponPartner",
};
const AffilateLinkPage = () => {
  return (
    <div className="">
      <div className="mt-10 pr-24 -mb-[15px]">
        <AdminHeader title="Affilate-Link" />
      </div>
      <div>
        <AffilateLinkTable />
      </div>
    </div>
  );
};

export default AffilateLinkPage;
