"use client";
import React, { useCallback, useEffect, useState } from "react";
import Couponcard from "@/components/Coupon.card";
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

  console.log(allCoupons);
  return (
    <div>
      {isLoading &&
        isFetching &&
        new Array(12)
          .fill(null)
          .map((el, index) => <SkeletonCouponCard key={index} />)}
      {!isLoading &&
        !isFetching &&
        allCoupons?.coupons?.map((item: ICoupon) => (
          <Couponcard coupon={item} />
        ))}
      {!isLoading && !isFetching && allCoupons?.totalPage && (
        <Pagination {...paginationProps} totalPages={allCoupons?.totalPage} />
      )}
    </div>
  );
};

export default CouponStore;
