"use client";
import React, { useCallback, useState } from "react";
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
type Props = {
  storeId: number;
};

const CouponStore: React.FC<Props> = ({ storeId }) => {
  const [page, setpage] = useState({
    pageNo: 1,
    noOfPages: 10,
  });
  const {
    data: allCoupons,
    isFetching,
    isLoading,
    refetch,
  } = UseGetAllCouponsOfStore(storeId, page.pageNo, page.noOfPages);

  const onSubmit = () => refetch();
  const debouncedSubmit = debounce(onSubmit, 400);
  const _debounceSubmit = useCallback(debouncedSubmit, []);
  console.log(allCoupons);
  return (
    <div>
      {!isLoading &&
        !isFetching &&
        allCoupons?.coupons?.map((item: any) => <Couponcard />)}
      <div className="flex items-center gap-4 justify-center mt-10 border border-slate-100 p-2 rounded-md my-10">
        <p>
          Page {allCoupons?.currentPage} of {allCoupons?.totalPage}
        </p>
        <Button
          variant={"ghost"}
          disabled={page.pageNo === 1}
          className="flex  gap-1 items-center"
          onClick={() => {
            setpage({ ...page, pageNo: page.pageNo - 1 });
            _debounceSubmit();
          }}
        >
          <ArrowLeft className="h-4 w-4" /> Previous
        </Button>
        <Button
          variant={"ghost"}
          disabled={allCoupons?.totalPage <= page.pageNo}
          className="flex  gap-1 items-center"
          onClick={() => {
            setpage({ ...page, pageNo: page.pageNo + 1 });
            _debounceSubmit();
          }}
        >
          Next <ArrowRight className="h-4 w-4" />
        </Button>
        <Select
          onValueChange={(val: any) => {
            setpage({ pageNo: 1, noOfPages: Number(val) });
            _debounceSubmit();
          }}
          defaultValue={page.noOfPages.toString()}
        >
          <SelectTrigger className="w-[60px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="border border-black">
            <SelectItem value={"5"}>5</SelectItem>
            <SelectItem value={"1"}>1</SelectItem>
            <SelectItem value={"10"}>10</SelectItem>
            <SelectItem value={"15"}>15</SelectItem>
            <SelectItem value={"20"}>20</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CouponStore;
