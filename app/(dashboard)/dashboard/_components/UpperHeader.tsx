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

function UpperHeader() {
  return (
    <div className="ms-24 md:ms-0 lg:ms-24 flex  justify-center">
      <div className="w-full grid-cols-1  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid  gap-8">
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
            <p className="font-medium  text-3xl  ">10000</p>
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
            <p className="font-medium  text-3xl  ">20000</p>
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
            <p className="font-medium  text-3xl  ">30000</p>
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
            <p className="font-medium  text-3xl  ">40000</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default UpperHeader;
