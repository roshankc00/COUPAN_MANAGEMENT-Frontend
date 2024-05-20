"use client";
import { UseGetLast12MonthUsersAnalytics } from "@/hooks/react-query/analytics/get-user-12-month-analytics";
import React from "react";
import Chart from "./Chart";
import { UseGetLast12MonthStoresAnalytics } from "@/hooks/react-query/analytics/get-store-12-month-analytics";

const StoreAnalytics = () => {
  const { data, isFetching, isLoading } = UseGetLast12MonthStoresAnalytics();
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <div className="z-0">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <Chart
            data={data?.last12Months}
            tag="noOfStore"
            title="Store Analytics"
          />
        </div>
      </div>
    </div>
  );
};

export default StoreAnalytics;
