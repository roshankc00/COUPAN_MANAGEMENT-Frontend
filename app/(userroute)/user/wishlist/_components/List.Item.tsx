"use client";
import { UseGetAllFollowedStore } from "@/hooks/react-query/stores/get-all-followed-store";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import React, { useCallback, useState } from "react";
import AlpaStore from "../../browse/store/_component/Alpa";
import { UseGetAllUserWishlistCoupons } from "@/hooks/react-query/coupons/get-all-wishlist.coupons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import debounce from "lodash.debounce";
import { ICoupon } from "@/interfaces/coupon.interface";
import CouponCard from "@/components/cards/Coupon.card";
import CouponSkeletonCard from "@/components/cards/CouponSkeleton";
import EmptyState from "@/components/EmptyState";
const ListWishlists = () => {
  const ALL_ROUTES = ["All", "Active", "Expire"];
  const [activeRoute, setactiveRoute] = useState("all");
  const { isLoading, isFetching, data, refetch } =
    UseGetAllUserWishlistCoupons(activeRoute);
  const onSubmit = () => refetch();

  const debouncedSubmit = debounce(onSubmit, 400);
  const _debounceSubmit = useCallback(debouncedSubmit, []);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg-px-8 my-16">
      <h1 className="text-4xl font-medium my-10 ">Saved Offers</h1>
      <div className="grid grid-cols-3">
        {ALL_ROUTES?.map((item) => {
          return (
            <button
              className={`p-2 rounded-sm  ${
                activeRoute === item.toLowerCase()
                  ? "bg-black text-white"
                  : "bg-white text-black border"
              } `}
              onClick={() => {
                setactiveRoute(item.toLowerCase());
                _debounceSubmit();
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 my-20  lg:grid-cols-3 gap-4 place-content-center ">
        {!isFetching &&
          !isLoading &&
          data?.map((item: any) => <CouponCard coupon={item?.coupon} />)}
        {isLoading &&
          isFetching &&
          new Array(12)
            .fill(null)
            .map((el, index) => <CouponSkeletonCard key={index} />)}

        {!isFetching && !isLoading && data?.length <= 0 && <EmptyState />}
      </div>
    </main>
  );
};

export default ListWishlists;
