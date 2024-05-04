import { NextPage } from "next";
import React from "react";
import UpperHeader from "./_components/UpperHeader";
import UserAnalytics from "./_components/UserAnalytics";
import StoreAnalytics from "./_components/StoreAnalytics";
import CouponAnalytics from "./_components/CouponAnalytics";

type Props = {};

const DashboardPage: NextPage = (props: Props) => {
  return (
    <div className="grid grid-cols-1">
      <UpperHeader />
      <div className="ms-24 my-10">
        <UserAnalytics />
        <StoreAnalytics />
        <CouponAnalytics />
      </div>
    </div>
  );
};

export default DashboardPage;
