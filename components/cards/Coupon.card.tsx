"use client";
import React from "react";
import { SlCalender } from "react-icons/sl";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { ICoupon } from "@/interfaces/coupon.interface";
import { calculateRemaingDays } from "@/common/helpers/calculate.expire.date";
import { UseGetCurrentUser } from "@/hooks/react-query/users/get-current-user";
import { UseItemExistInWishlist } from "@/hooks/react-query/coupons/item-exist-in-wishlist";
import { FaHeart } from "react-icons/fa";
import { IoIosBookmark } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { client } from "../Provider";
import { addRemoveInWatchList } from "@/common/api/coupons/coupons.api";
import { UseGetAllUserWishlistCoupons } from "@/hooks/react-query/coupons/get-all-wishlist.coupons";
import { alreadySaved } from "@/common/helpers/savedCouponOrNot";

interface Props {
  coupon: ICoupon;
}

const CouponCard: React.FC<Props> = ({ coupon }) => {
  const { mutate: handleAddRemoveToWatchList } = useMutation({
    mutationFn: addRemoveInWatchList,
    onSuccess(data) {
      toast.success(data?.message);
      client.invalidateQueries({
        queryKey: ["wishlistdata"],
      });
    },
  });

  const { data, isLoading } = UseGetAllUserWishlistCoupons("all");

  return (
    <div className="group relative p-3 shadow-md rounded-md">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 ">
        <img
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${coupon?.imageName}`}
          alt="Product image"
          className=" w-full h-[200px] object-cover object-center rounded-md"
        />
        <div className="absolute top-0 right-0">
          {!isLoading && alreadySaved(+coupon?.id, data) ? (
            <IoIosBookmark
              color="red"
              size={25}
              onClick={() => handleAddRemoveToWatchList(+coupon?.id)}
              className="cursor-pointer"
            />
          ) : (
            <IoIosBookmark
              color="gray"
              size={25}
              className="cursor-pointer"
              onClick={() => handleAddRemoveToWatchList(+coupon?.id)}
            />
          )}
        </div>
      </div>
      <p className="text-[16px] mt-2 font-medium text-gray-900">
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

export default CouponCard;
