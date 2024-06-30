import React from "react";
import AdminHeader from "../_component/Header";
import OfferTable from "./_component/table";
export const metadata = {
  title: "Dashboard-Offer | NepQue ",
  description: "NepQue: Your CouponPartner",
};
const OfferPage = () => {
  return (
    <div className="">
      <div className="pt-10">
        <AdminHeader title="User-Send-Offer" />
      </div>
      <div>
        <OfferTable />
      </div>
    </div>
  );
};

export default OfferPage;
