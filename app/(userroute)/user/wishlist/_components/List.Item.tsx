"use client";
import React, { useCallback, useState } from "react";
import { UseGetAllUserWishlistCoupons } from "@/hooks/react-query/coupons/get-all-wishlist.coupons";
import debounce from "lodash.debounce";
import CouponCard from "@/components/cards/Coupon.card";
import CouponSkeletonCard from "@/components/cards/CouponSkeleton";
import EmptyState from "@/components/EmptyState";
import { IWishlistInterface } from "@/interfaces/wishlist.interface";
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
              key={item}
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
      <div className="grid grid-cols-1 my-20  lg:grid-cols-2 gap-4 place-content-center ">
        {!isFetching &&
          !isLoading &&
          data?.map((item: IWishlistInterface) => (
            <CouponCard
              key={item.storeId + item.userId}
              coupon={item?.coupon}
            />
          ))}
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
