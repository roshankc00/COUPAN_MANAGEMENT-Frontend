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
import { Separator } from "@/components/ui/separator";
type Props = {
  storeId: number;
};

const CouponStore: React.FC<Props> = ({ storeId }) => {
  const params = useSearchParams();
  const [isCoppied, setisCoppied] = useState(false);
  const key = params.get("key");
  const tag = params.get("tagLine");
  const couponDescription = params.get("description");
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
      client.invalidateQueries({
        queryKey: ["exist-in-followelist"],
      });
      client.invalidateQueries({
        queryKey: ["exist-in-followelist"],
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
      setisCoppied(true);
    } catch (err) {
      setisCoppied(false);
    }
  }
  return (
    <div>
      <div>
        <Dialog open={open} onOpenChange={setopen}>
          <DialogContent className="w-[30%]">
            <div className="flex flex-col  items-center justify-center mb-10">
              {storeDetails?.imageUrl && (
                <img
                  src={storeDetails.imageUrl}
                  alt=""
                  className="w-20 rounded-sm"
                />
              )}
              <h1 className="text-xl -my-5">{tag}</h1>
            </div>
            <div>
              <p className="text-center">
                Copy code and shop{" "}
                {storeDetails?.title && "at " + storeDetails?.title}
              </p>
              <div className="flex justify-center gap-2 my-1">
                <h1 className="border-dashed border-2 border-blue-600 py-2 px-3 rounded-md text-xl">
                  {key}
                </h1>
                <button
                  className="bg-[#2563EB]  w-[100px]  rounded-md text-white text-[16px] font-medium"
                  onClick={() => copyToClipboard(key!)}
                >
                  {isCoppied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
            <Separator />
            <p className="text-center">{couponDescription}</p>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-10 sm:grid-cols-7 gap-5">
        <div className="col-span-4 sm:col-span-2 hidden sm:block shadow-sm rounded-md">
          {!storeDetailsLoading && !storeDetailsFetching && (
            <Card>
              <CardContent className="mt-4">
                <div className="">
                  <div className="rounded-md p-2 border flex justify-center">
                    <img
                      src={`${storeDetails?.imageUrl}`}
                      alt=""
                      className=" rounded-md"
                    />
                  </div>

                  <div>
                    <h1 className="font-bold text-center text-xl mx-2 mt-4">
                      {storeDetails?.title}
                    </h1>

                    <div className="mt-4 flex gap-2 justify-center items-center">
                      <div>
                        {!existLoading && isLogedInStatus && (
                          <button
                            className="p-1  w-[120px] bg-blue-600 text-white rounded-md shadow-sm"
                            onClick={() =>
                              handleFollowUnFollowClick({
                                storeId: +storeId,
                              })
                            }
                          >
                            {itemExist?.exist ? "Unfollow" : "Follow"}
                          </button>
                        )}
                      </div>
                      <button
                        className="border border-blue-600 p-1 w-[120px] text-black rounded-md shadow-sm"
                        onClick={() => handleNavigate()}
                      >
                        {" "}
                        Visit Store
                      </button>
                    </div>

                    <div className="mt-5">
                      <span className=" flex justify-between items-center border p-1 px-2 rounded-md shadow-sm">
                        <span>Followers</span>
                        <span>{storeDetails?.followers?.length}</span>
                      </span>
                      <span className="mt-2 px-2 flex justify-between items-center border p-1 rounded-md shadow-sm">
                        <span>Coupons</span>
                        <span>{storeDetails?.coupons?.length}</span>
                      </span>
                    </div>

                    <div className="mt-5">
                      <Separator />
                      <p className="text-center my-2 ">
                        {storeDetails?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="col-span-10 sm:col-span-5">
          <div className="grid grid-cols-1 gap-2">
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
              <Pagination
                {...paginationProps}
                totalPages={allCoupons?.totalPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponStore;
