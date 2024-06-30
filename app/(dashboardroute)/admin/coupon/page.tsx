import React from "react";
import AdminHeader from "../_component/Header";
import CouponTable from "./_component/table";

export const metadata = {
  title: "Dashboard-Coupon | NepQue ",
  description: "NepQue: Your CouponPartner",
};
const CouponPage = () => {
  return (
    <div className="">
      <div className="pt-10">
        <AdminHeader title="Coupon" />
      </div>
      <div>
        <CouponTable />
      </div>
    </div>
  );
};

export default CouponPage;
