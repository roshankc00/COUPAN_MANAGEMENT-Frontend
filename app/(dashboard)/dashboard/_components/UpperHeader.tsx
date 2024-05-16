"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Component, Cylinder, Layers3, UsersRound } from "lucide-react";
import { UseGetLast12MonthStoresAnalytics } from "@/hooks/react-query/analytics/get-store-12-month-analytics";
import { UseGetAllCounts } from "@/hooks/react-query/analytics/getAllCounts";

function UpperHeader() {
  const { data, isFetching, isLoading } = UseGetAllCounts();
  return (
    <div className="flex  justify-center">
      <div className="w-full grid-cols-1  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid  gap-8 my-16">
        {/* user */}
        <Card className="">
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription className="flex justify-between px-2">
              <span className=" text-black">Total Users</span>
              <UsersRound />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium  text-3xl  ">
              {data && !isLoading && !isFetching && data?.users}
            </p>
          </CardContent>
        </Card>
        {/* store  */}
        <Card className="">
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription className="flex justify-between px-2">
              <span>Total Stores</span>
              <Cylinder />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium  text-3xl  ">
              {data && !isLoading && !isFetching && data?.stores}
            </p>
          </CardContent>
        </Card>
        {/* coupons */}
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription className="flex justify-between px-2">
              <span>Total Coupons</span>
              <Component />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium  text-3xl  ">
              {data && !isLoading && !isFetching && data?.coupons}
            </p>
          </CardContent>
        </Card>
        {/* category */}
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription className="flex justify-between px-2">
              <span>Total Categories</span>
              <Layers3 />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium  text-3xl  ">
              {data && !isLoading && !isFetching && data?.categories}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default UpperHeader;
