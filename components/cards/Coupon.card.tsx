"use client";
import React from "react";
import { SlCalender } from "react-icons/sl";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { ICoupon } from "@/interfaces/coupon.interface";
import { calculateRemaingDays } from "@/common/helpers/calculate.expire.date";
import { UseItemExistInWishlist } from "@/hooks/react-query/coupons/item-exist-in-wishlist";
import { FaHeart } from "react-icons/fa";
import { IoIosBookmark } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { client } from "../Provider";
import { addRemoveInWatchList } from "@/common/api/coupons/coupons.api";
import { UseGetAllUserWishlistCoupons } from "@/hooks/react-query/coupons/get-all-wishlist.coupons";
import { alreadySaved } from "@/common/helpers/savedCouponOrNot";
import Link from "next/link";
import { increaseCount } from "@/common/api/affilate-link/affilate-link.api";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { handleNavigateCouponAffiliateLink } from "@/common/helpers/handleNavigateAffilateLinkCoupon";

interface Props {
  coupon: ICoupon;
}

const CouponCard: React.FC<Props> = ({ coupon }) => {
  const router = useRouter();
  const { isLogedInStatus, userId } = useSelector(
    (state: IRootState) => state.auth
  );
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
  const { mutateAsync: handleDealDone } = useMutation({
    mutationFn: increaseCount,
  });

  const handleDeal = async () => {
    if (isLogedInStatus) {
      handleDealDone(+coupon?.store?.affiliateLink?.id);
      window.open(
        `${coupon?.store?.affiliateLink?.link}?subId1=${userId}`,
        "_blank"
      );
    } else {
      router.push(
        `/user/alert?alert=${coupon?.store?.affiliateLink.link}&id=${coupon?.store?.affiliateLink?.id}&cashbackAmountPer=${coupon?.store?.affiliateLink?.cashbackAmountPer}`
      );
    }
  };

  async function copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied");
    } catch (err) {
      toast.success("Unable to copy");
    }
  }

  return (
    <div className="group relative p-3 shadow-md rounded-md bg-white hover:-translate-y-1 transition-all">
      <div className="flex gap-5 items-center justify-between ">
        <div className="flex gap-5 items-center">
          <div className=" overflow-hidden rounded-md">
            <img
              src={`${coupon?.imageUrl}`}
              alt="Product image"
              className=" w-[100px] h-[100px] object-cover object-center rounded-md shadow-md border-none  sm:border p-0 lg:p-2"
            />
          </div>
          <div>
            <p className="text-[16px] mt-2 font-bold text-gray-900">
              {coupon?.tagLine}
            </p>

            <div className="flex gap-3 mt-2 items-center">
              <div className="flex gap-1 items-center">
                <PiBuildingOfficeLight />
                <h3 className="text-sm text-gray-700">
                  {coupon?.store?.title}
                </h3>
              </div>
              <div className="flex gap-2 items-center">
                <SlCalender />
                <h3 className="text-sm text-gray-700">
                  {calculateRemaingDays(coupon?.expireDate) > 0 ? (
                    `${calculateRemaingDays(coupon?.expireDate)} Days Left`
                  ) : (
                    <>
                      {calculateRemaingDays(coupon?.expireDate) === 0 ? (
                        <h3 className="text-sm text-gray-700">
                          Final Day Left
                        </h3>
                      ) : (
                        <div className="flex items-center gap-1">
                          <div className="bg-red-500 h-2 w-2 rounded-full "></div>
                          Expired
                        </div>
                      )}
                    </>
                  )}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          {coupon?.isDeal ? (
            <button
              className="bg-blue-700 p-2 w-[130px] ml-3  rounded-md text-white text-[16px] font-medium my-2"
              onClick={() => handleDeal()}
            >
              Deal
            </button>
          ) : (
            <button
              className="border border-dashed border-[#2563EB] p-2 w-[100px] mr-3  rounded-md  text-[16px] font-medium my-2 relative px-3 2-100"
              onClick={() => {
                handleNavigateCouponAffiliateLink(
                  `${coupon?.store?.affiliateLink?.link}`,
                  coupon.store.id,
                  coupon.code,
                  coupon.tagLine
                );
              }}
            >
              <span className="z-10">........{coupon.code.slice(0, 6)}</span>
              <span className="-top-[9px] -left-8 absolute bg-blue-700 py-[5px] w-[100px] h-[42px] ml-3   rounded-md text-white text-[16px] font-medium my-2  hover:-ml-2 rounded-tr-2xl transition-all flex justify-center items-center text-center ">
                Scratch
                <span className="h-3 bg-transparent absolute w-3 right-0 top-[1px] border-r-[15px]   border-b-[20px] border-r-white border-b-blue-800 "></span>
              </span>
            </button>
          )}
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
      </div>
    </div>
  );
};

export default CouponCard;
