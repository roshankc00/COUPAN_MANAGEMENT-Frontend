import { NextPage } from "next";
import React from "react";
import UpperHeader from "./_components/UpperHeader";
import UserAnalytics from "./_components/UserAnalytics";
import StoreAnalytics from "./_components/StoreAnalytics";
import CouponAnalytics from "./_components/CouponAnalytics";
import DataCarts from "./_components/DataCarts";

type Props = {};

export const metadata = {
  title: "Dashboard | NepQue ",
  description: "NepQue: Your CouponPartner",
};
const DashboardPage: NextPage = (props: Props) => {
  return (
    <div className="">
      <UpperHeader />
      <div className="grid grid-cols-1 2xl:grid-cols-2 w-full z-0 gap-5">
        <UserAnalytics />
        <StoreAnalytics />
        <CouponAnalytics />
      </div>
    </div>
  );
};

export default DashboardPage;
