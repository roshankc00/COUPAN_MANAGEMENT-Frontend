"use client";
import React from "react";
import EditCouponForm from "./EditCouponForm";
import { UseGetSingleCoupon } from "@/hooks/react-query/coupons/get-single-coupon";

type Props = {
  id: number;
};
const EditCoupon = ({ id }: Props) => {
  const {
    data: singleData,
    isFetching: singleDataFetching,
    isLoading: singleDataLoading,
  } = UseGetSingleCoupon(id);
  return (
    <div>
      {!singleDataFetching && !singleDataLoading && (
        <EditCouponForm id={id} singleData={singleData} />
      )}
    </div>
  );
};

export default EditCoupon;
