"use client";
import { UseGetAllCoupons } from "@/hooks/react-query/coupons/get_all_coupons.hook";
import React from "react";
import Couponcard from "../Coupon.card";
import { ICoupon } from "@/interfaces/coupon.interface";

const Featuredcoupons = () => {
  const { data, isFetching, isLoading } = UseGetAllCoupons();
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg-px-8 my-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
        {/* {!isLoading && !isFetching && data?.map((item: ICoupon) => <Couponcard />)} */}
        <Couponcard />
        <Couponcard />
        <Couponcard />
        <Couponcard />
        <Couponcard />
        <Couponcard />
        <Couponcard />
        <Couponcard />
        <Couponcard />
        <Couponcard />
      </div>
    </main>
  );
};

export default Featuredcoupons;
