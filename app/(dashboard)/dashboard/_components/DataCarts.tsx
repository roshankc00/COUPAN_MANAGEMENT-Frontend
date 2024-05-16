"use client";
import { UseGetLast12MonthUsersAnalytics } from "@/hooks/react-query/analytics/get-user-12-month-analytics";
import React from "react";
import Chart from "./Chart";

const DataCarts = () => {
  const { data, isFetching, isLoading } = UseGetLast12MonthUsersAnalytics();
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 z-0">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <Chart
            data={data?.last12Months}
            tag="noOfUser"
            title="User Analytics"
          />
        </div>
      </div>
    </div>
  );
};

export default DataCarts;
