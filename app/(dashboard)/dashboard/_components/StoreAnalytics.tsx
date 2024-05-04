"use client";
import { UseGetLast12MonthUsersAnalytics } from "@/hooks/react-query/analytics/get-user-12-month-analytics";
import React from "react";
import BarGraph from "./Bargraph";
import LineChart from "./LineChart";
import { UseGetLast12MonthStoresAnalytics } from "@/hooks/react-query/analytics/get-store-12-month-analytics";

function StoreAnalytics() {
  const { data, isFetching, isLoading } = UseGetLast12MonthStoresAnalytics();
  return (
    <div>
      <div className="grid grid-cols-1  2xl:grid-cols-2 gap-2 my-10">
        {!isLoading && !isFetching && (
          <BarGraph title="store" data={data.last12Months} />
        )}
        {!isLoading && !isFetching && (
          <LineChart data={data?.last12Months} title="Store" />
        )}
      </div>
    </div>
  );
}

export default StoreAnalytics;
