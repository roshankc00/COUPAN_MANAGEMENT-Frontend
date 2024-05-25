"use client";
import React from "react";
import { SlCalender } from "react-icons/sl";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { ICoupon } from "@/interfaces/coupon.interface";
import { calculateRemaingDays } from "@/common/helpers/calculate.expire.date";

interface Props {
  coupon: ICoupon;
}

const CouponCard2: React.FC<Props> = ({ coupon }) => {
  return (
    <div className="group relative p-3 shadow-md rounded-md">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 ">
        <img
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${coupon?.imageName}`}
          alt="Product image"
          className=" w-full h-[200px] object-cover object-center rounded-md"
        />
      </div>
      <p className="text-xl mt-2 font-medium text-gray-900">
        {coupon?.tagLine}
      </p>
      <div className="flex gap-3 mt-2 items-center">
        <div className="flex gap-1 items-center">
          <PiBuildingOfficeLight />
          <h3 className="text-sm text-gray-700">{coupon?.store?.title}</h3>
        </div>
        <div className="flex gap-2 items-center">
          <SlCalender />
          <h3 className="text-sm text-gray-700">
            {calculateRemaingDays(coupon?.expireDate) >= 0 ? (
              `${calculateRemaingDays(coupon?.expireDate)} Days Left`
            ) : (
              <div className="flex items-center gap-1">
                <div className="bg-red-500 h-2 w-2 rounded-full "></div>
                Expired
              </div>
            )}
          </h3>
        </div>
      </div>
      <button className="bg-[#2563EB] p-2 w-full rounded-md text-white text-[16px] font-medium my-2">
        Scratch
      </button>
    </div>
  );
};

export default CouponCard2;
