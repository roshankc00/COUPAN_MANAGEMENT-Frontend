import React from "react";
import CategoryTable from "./_component/table";

export const metadata = {
  title: "Coupon | NepQue ",
  description: "NepQue: Your CouponPartner",
};
const CouponPage = () => {
  return (
    <div className="flex justify-center">
      <div>
        <CategoryTable />
      </div>
    </div>
  );
};

export default CouponPage;
