"use client";
import React from "react";
import BarGraph from "./Bargraph";
import LineChart from "./LineChart";
import { UseGetLast12MonthCouponsAnalytics } from "../../../../hooks/react-query/analytics/get-coupon-12-month-analytics";
import { Coupon } from "../../../../../server/src/coupons/entities/coupon.entity";

function CouponAnalytics() {
  const { data, isFetching, isLoading } = UseGetLast12MonthCouponsAnalytics();
  return (
    <div>
      <div className="grid grid-cols-1  2xl:grid-cols-2 gap-2 my-10">
        {!isLoading && !isFetching && (
          <BarGraph title="Coupon" data={data.last12Months} />
        )}
        {!isLoading && !isFetching && (
          <LineChart title="Coupon" data={data?.last12Months} />
        )}
      </div>
    </div>
  );
}

export default CouponAnalytics;
