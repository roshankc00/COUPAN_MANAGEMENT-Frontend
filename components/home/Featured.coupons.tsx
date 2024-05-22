"use client";
import { UseGetAllCoupons } from "@/hooks/react-query/coupons/get_all_coupons.hook";
import React from "react";
import Couponcard from "../Coupon.card";
import { ICoupon } from "@/interfaces/coupon.interface";
import { SkeletonCouponCard } from "../CouponCard.skeleton";
import { handleLogin } from "@/common/api/users/user.api";
import { Button } from "../ui/button";

const Featuredcoupons = () => {
  const { data, isFetching, isLoading } = UseGetAllCoupons();
  console.log(data);
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg-px-8 my-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
        {isLoading &&
          isFetching &&
          new Array(12)
            .fill(null)
            .map((el, index) => <SkeletonCouponCard key={index} />)}
        {!isLoading &&
          !isFetching &&
          data?.map((item: ICoupon) => <Couponcard coupon={item} />)}
      </div>
    </main>
  );
};

export default Featuredcoupons;
