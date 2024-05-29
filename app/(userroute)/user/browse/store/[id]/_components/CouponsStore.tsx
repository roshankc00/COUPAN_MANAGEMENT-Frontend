"use client";
import React, { useCallback, useEffect, useState } from "react";
import { UseGetAllCouponsOfStore } from "@/hooks/react-query/coupons/get-all-coupons-of-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import debounce from "lodash.debounce";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ICoupon } from "@/interfaces/coupon.interface";
import Pagination, { usePagination } from "@/components/ui/pagination";
import { SkeletonCouponCard } from "@/components/CouponCard.skeleton";
import CouponCard from "@/components/cards/Coupon.card";
import { UseGetStoreInfo } from "@/hooks/react-query/stores/get-single-store";
import { UseGetCurrentUser } from "@/hooks/react-query/users/get-current-user";
import { isStoreFollowed } from "@/common/helpers/followedUserOrNot";
import { useMutation } from "@tanstack/react-query";
import { followUnfollowstore } from "@/common/api/stores/store.api";
import toast from "react-hot-toast";
import { client } from "@/components/Provider";
import EmptyStateFilter from "@/components/EmptyFilterState";
import CouponSkeletonCard from "@/components/cards/CouponSkeleton";
type Props = {
  storeId: number;
};

const CouponStore: React.FC<Props> = ({ storeId }) => {
  const paginationProps = usePagination();
  const {
    data: allCoupons,
    isFetching,
    isLoading,
    refetch,
  } = UseGetAllCouponsOfStore(storeId, paginationProps.currentPage, 10);

  const onSubmit = () => refetch();
  const debouncedSubmit = debounce(onSubmit, 400);
  const _debounceSubmit = useCallback(debouncedSubmit, []);
  useEffect(() => {
    _debounceSubmit();
  }, [paginationProps.currentPage]);

  const {
    data: storeDetails,
    isFetching: storeDetailsLoading,
    isLoading: storeDetailsFetching,
    refetch: storeDetailsRefetch,
  } = UseGetStoreInfo(storeId);

  const { mutate: handleFollowUnFollowClick } = useMutation({
    mutationFn: followUnfollowstore,
    onSuccess(data) {
      toast.success(data?.message);
      client.invalidateQueries({
        queryKey: ["followed-store"],
      });
    },
  });

  useEffect(() => {
    storeDetailsRefetch();
  }, [storeId]);

  return (
    <div>
      <div className=" border-b-2 pb-10">
        {!storeDetailsLoading && !storeDetailsFetching && (
          <div className="flex gap-3 items-center mt-4">
            <img
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${storeDetails?.imageName}`}
              alt=""
              className="w-[20%] h-[30%]"
            />
            <div>
              <h1 className="font-bold   text-2xl ">{storeDetails?.title}</h1>
              <div>
                <span>{storeDetails?.followers?.length} followers</span>
                <span>{storeDetails?.coupons?.length} coupons</span>
                <span>active coupons</span>
              </div>
              <p className="p-2">{storeDetails?.description}</p>
              <button
                className="p-1 px-5 bg-blue-600 text-white rounded-md shadow-sm"
                onClick={() =>
                  handleFollowUnFollowClick({
                    storeId: +storeId,
                  })
                }
              >
                {isStoreFollowed(+storeId, storeDetails)
                  ? "Unfollow"
                  : "Follow"}
              </button>
            </div>
          </div>
        )}
      </div>

      <h1 className=" text-3xl font-semibold text-blue-700 flex justify-center my-10">
        All Coupons
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-12">
        {isLoading &&
          isFetching &&
          new Array(12)
            .fill(null)
            .map((el, index) => <CouponSkeletonCard key={index} />)}
        {!isLoading &&
          !isLoading &&
          allCoupons?.coupons?.map((item: ICoupon) => (
            <CouponCard coupon={item} />
          ))}
        {!isLoading && !isLoading && allCoupons?.coupons?.length <= 0 && (
          <EmptyStateFilter />
        )}
      </div>
      <div className="flex justify-center">
        {!isLoading && !isFetching && allCoupons?.totalPage && (
          <Pagination {...paginationProps} totalPages={allCoupons?.totalPage} />
        )}
      </div>
    </div>
  );
};

export default CouponStore;
