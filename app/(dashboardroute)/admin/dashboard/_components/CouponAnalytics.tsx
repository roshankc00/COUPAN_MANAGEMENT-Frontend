"use client";
import { UseGetLast12MonthUsersAnalytics } from "@/hooks/react-query/analytics/get-user-12-month-analytics";
import React from "react";
import Chart from "./Chart";
import { UseGetLast12MonthCouponsAnalytics } from "@/hooks/react-query/analytics/get-coupon-12-month-analytics";

const CouponAnalytics = () => {
  const { data, isFetching, isLoading } = UseGetLast12MonthCouponsAnalytics();
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <Chart
            data={data?.last12Months}
            tag="noOfCoupons"
            title="Coupons Analytics"
          />
        </div>
      </div>
    </div>
  );
};

export default CouponAnalytics;
