"use client";
import { UseGetAllCoupons } from "@/hooks/react-query/coupons/get_all_coupons.hook";
import React from "react";
import Couponcard from "../Review.Coupon.card";
import { ICoupon } from "@/interfaces/coupon.interface";
import { SkeletonCouponCard } from "../CouponCard.skeleton";
import { handleLogin } from "@/common/api/users/user.api";
import { Button } from "../ui/button";
import CouponCard from "../cards/Coupon.card";
import { UseGetLatesCoupons } from "@/hooks/react-query/coupons/get-latest-coupons";
import CouponSkeletonCard from "../cards/CouponSkeleton";

const Featuredcoupons = () => {
  const { data, isFetching, isLoading } = UseGetLatesCoupons();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg-px-8 my-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 ">
        {isLoading &&
          isFetching &&
          new Array(9)
            .fill(null)
            .map((el, index) => <CouponSkeletonCard key={index} />)}
        {!isLoading &&
          !isFetching &&
          data?.map((item: ICoupon) => (
            <CouponCard key={item.id} coupon={item} />
          ))}
      </div>
    </div>
  );
};

export default Featuredcoupons;
