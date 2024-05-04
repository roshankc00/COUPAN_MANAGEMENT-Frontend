"use client";
import { UseGetLast12MonthUsersAnalytics } from "@/hooks/react-query/analytics/get-user-12-month-analytics";
import React from "react";
import BarGraph from "./Bargraph";
import LineChart from "./LineChart";

function UserAnalytics() {
  const { data, isFetching, isLoading } = UseGetLast12MonthUsersAnalytics();
  return (
    <div>
      <div className="grid grid-cols-1  2xl:grid-cols-2 gap-2 my-10">
        {!isLoading && !isFetching && (
          <BarGraph title="User" data={data.last12Months} />
        )}
        {!isLoading && !isFetching && (
          <LineChart title="User" data={data?.last12Months} />
        )}
      </div>
    </div>
  );
}

export default UserAnalytics;
