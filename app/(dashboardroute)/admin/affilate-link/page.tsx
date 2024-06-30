import React from "react";
import AdminHeader from "../_component/Header";
import AffilateLinkTable from "./_component/table";

export const metadata = {
  title: "Dashboard-Affilate-Link | NepQue ",
  description: "NepQue: Your CouponPartner",
};
const AffilateLinkPage = () => {
  return (
    <div className="">
      <div className="pt-10">
        <AdminHeader title="Affilate-Link" />
      </div>
      <div>
        <AffilateLinkTable />
      </div>
    </div>
  );
};

export default AffilateLinkPage;
