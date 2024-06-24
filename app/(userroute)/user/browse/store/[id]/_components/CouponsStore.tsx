"use client";
import React, { useCallback, useEffect, useState } from "react";
import { UseGetAllCouponsOfStore } from "@/hooks/react-query/coupons/get-all-coupons-of-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import debounce from "lodash.debounce";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ICoupon } from "@/interfaces/coupon.interface";
import Pagination, { usePagination } from "@/components/ui/pagination";
import { SkeletonCouponCard } from "@/components/CouponCard.skeleton";
import CouponCard from "@/components/cards/Coupon.card";
import { UseGetStoreInfo } from "@/hooks/react-query/stores/get-single-store";
import { isStoreFollowed } from "@/common/helpers/followedUserOrNot";
import { useMutation } from "@tanstack/react-query";
import { followUnfollowstore } from "@/common/api/stores/store.api";
import toast from "react-hot-toast";
import { client } from "@/components/Provider";
import EmptyStateFilter from "@/components/EmptyFilterState";
import CouponSkeletonCard from "@/components/cards/CouponSkeleton";
import { UseItemExistInFollowerlist } from "@/hooks/react-query/stores/item-exist-in-store";
import { date } from "zod";
import { increaseCount } from "@/common/api/affilate-link/affilate-link.api";
import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
type Props = {
  storeId: number;
};

const CouponStore: React.FC<Props> = ({ storeId }) => {
  const params = useSearchParams();
  const key = params.get("key");
  const tag = params.get("tagLine");
  const [open, setopen] = useState(key && tag ? true : false);
  const { isLogedInStatus, userId } = useSelector(
    (state: IRootState) => state.auth
  );
  const router = useRouter();
  const paginationProps = usePagination();
  const {
    data: allCoupons,
    isFetching,
    isLoading,
    refetch,
  } = UseGetAllCouponsOfStore(storeId, paginationProps.currentPage, 30);

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
    refetch();
  }, [storeId]);

  const { data: itemExist, isLoading: existLoading } =
    UseItemExistInFollowerlist(storeId);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: increaseCount,
  });
  const handleNavigate = () => {
    if (isLogedInStatus) {
      mutateAsync(storeDetails?.affiliateLink.id);
      window.open(
        `${storeDetails.affiliateLink.link}?subId1=${userId}`,
        "_blank"
      );
    } else {
      router.push(
        `/user/alert?alert=${storeDetails?.affiliateLink.link}&id=${storeDetails?.affiliateLink?.id}&cashbackAmountPer=${storeDetails?.affiliateLink?.cashbackAmountPer}`
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
    <div>
      <div>
        <Dialog open={open} onOpenChange={setopen}>
          <DialogContent className="w-[30%]">
            <div className="flex gap-3 items-center justify-center">
              {storeDetails?.imageUrl && (
                <img
                  src={storeDetails.imageUrl}
                  alt=""
                  className="w-20 rounded-sm"
                />
              )}
              <h1 className="text-xl">{tag}</h1>
            </div>
            <div>
              <p className="text-center">
                Copy code and shop{" "}
                {storeDetails?.title && "at " + storeDetails?.title}
              </p>
              <div className="flex justify-center gap-2 mt-5">
                <h1 className="border-dashed border-2 border-blue-600 py-2 px-3 rounded-md text-xl">
                  {key}
                </h1>
                <button
                  className="bg-[#2563EB]  w-[100px]  rounded-md text-white text-[16px] font-medium"
                  onClick={() => copyToClipboard(key!)}
                >
                  Copy
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className=" pb-10">
        {!storeDetailsLoading && !storeDetailsFetching && (
          <Card>
            <CardContent className="py-10 pb-10">
              <div className="flex gap-10 items-center mt-4">
                <img
                  src={`${storeDetails?.imageUrl}`}
                  alt=""
                  className="w-[20%] h-[30%] border rounded-md p-2"
                />
                <div>
                  <h1 className="font-bold   text-2xl mx-2 ">
                    {storeDetails?.title}
                  </h1>
                  <div>
                    <span className="mx-2">
                      {storeDetails?.followers?.length} Followers
                    </span>
                    <span className="mx-2">
                      {storeDetails?.coupons?.length} Coupons
                    </span>
                  </div>
                  <p className="p-2">{storeDetails?.description}</p>
                  {!existLoading && isLogedInStatus && (
                    <button
                      className="p-1 px-5 bg-blue-600 text-white rounded-md shadow-sm"
                      onClick={() =>
                        handleFollowUnFollowClick({
                          storeId: +storeId,
                        })
                      }
                    >
                      {itemExist?.exist ? "Unfollow" : "Follow"}
                    </button>
                  )}
                  <button
                    className="p-1 px-5 border ms-3 border-blue-600   rounded-md shadow-sm"
                    onClick={() => handleNavigate()}
                  >
                    {" "}
                    Visit Store
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <h1 className=" text-3xl font-semibold text-blue-700 flex justify-center my-10">
        All Coupons
      </h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-12">
        {isLoading &&
          isFetching &&
          new Array(12)
            .fill(null)
            .map((el, index) => <CouponSkeletonCard key={index} />)}
        {!isLoading &&
          !isLoading &&
          allCoupons?.coupons?.map((item: ICoupon) => (
            <CouponCard key={item.id} coupon={item} />
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
