"use client";
import { Input } from "@/components/ui/input";
import { UseGetSingleCoupon } from "@/hooks/react-query/coupons/get-single-coupon";
import React, { useCallback, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseGetAllReviews } from "@/hooks/react-query/reviews/get-all-reviews";
import Pagination, { usePagination } from "@/components/ui/pagination";
import ReviewCard from "@/components/ReviewCard";
import debounce from "lodash.debounce";
import ReviewCardSkeleton from "@/components/RatingCardSkeleton";
import { UseGetReviewStatus } from "@/hooks/react-query/reviews/get-review.status.hook";
import { Progress } from "@/components/ui/progress";
import { FaStar } from "react-icons/fa";
import ReviewCouponcard from "@/components/Review.Coupon.card";
import ReviewForm from "@/components/Review.form";
type Props = {
  id: number;
};
const ReviewRating: React.FC<Props> = ({ id }) => {
  const paginationProps = usePagination();
  const [searchText, setsearchText] = useState("");
  const [rating, setrating] = useState(0);
  const { data, isLoading, isFetching } = UseGetSingleCoupon(id);
  const {
    data: allReview,
    isLoading: reviewLoading,
    isFetching: reviewFetching,
    refetch,
  } = UseGetAllReviews(paginationProps.currentPage, 10, id, rating, searchText);
  const onSubmit = () => refetch();

  const debouncedSubmit = debounce(onSubmit, 400);
  const _debounceSubmit = useCallback(debouncedSubmit, []);

  const { data: statusData, isLoading: statusLoading } = UseGetReviewStatus(id);
  return (
    <div>
      {!isLoading && !isFetching && (
        <div>
          <ReviewCouponcard coupon={data} />
        </div>
      )}

      {isLoading && isFetching && (
        <div>
          <ReviewCardSkeleton coupon={data} />
        </div>
      )}

      <div className=" my-10 p-5 border">
        {!reviewFetching &&
          !reviewLoading &&
          allReview?.reviews?.length > 0 && (
            <div>
              <h1 className="my-10 font-bold text-2xl">What Our User Says </h1>
              {!statusLoading && (
                <div>
                  {statusData?.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex gap-2 items-center justify-center my-10"
                    >
                      <div className="flex items-center gap-1 ">
                        <h1 className="text-bold">{item.rating} </h1>
                        <FaStar color="orange" />
                      </div>
                      <Progress value={item?.per} />
                      <h1 className="text-bold">{item.per.toFixed(2)}</h1>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        <div className="my-10">
          <h1 className="text-2xl font-bold">Reviews and Rating</h1>
        </div>
        <div className="grid md:grid-cols-7 grid-cols-8 gap-5">
          <Input
            placeholder="Search For a  Review"
            className="col-span-4"
            value={searchText}
            onChange={(e) => {
              setsearchText(e.target.value);
              _debounceSubmit();
            }}
          />
          <div className="col-span-2">
            <Select
              onValueChange={(val) => {
                setrating(+val);
                _debounceSubmit();
              }}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Filter by Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"0"}>allRating</SelectItem>
                <SelectItem value={"1"}>OneStar</SelectItem>
                <SelectItem value={"2"}>TwoStar</SelectItem>
                <SelectItem value={"3"}>ThreeStar</SelectItem>
                <SelectItem value={"4"}>FourStar</SelectItem>
                <SelectItem value={"5"}>FiveStar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-1">
            <ReviewForm couponId={+id} refetch={refetch} />
          </div>
        </div>
      </div>
      {reviewFetching &&
        reviewLoading &&
        new Array(12)
          .fill(null)
          .map((el, index) => <ReviewCardSkeleton key={index} />)}
      {!reviewFetching && !reviewLoading && allReview?.reviews?.length > 0 ? (
        <div>
          {!reviewFetching &&
            !reviewLoading &&
            allReview?.reviews?.map((item: any) => (
              <ReviewCard data={item} key={item.id} />
            ))}
          {!reviewFetching && !reviewLoading && (
            <Pagination
              {...paginationProps}
              totalPages={allReview?.totalPage}
            />
          )}
        </div>
      ) : (
        <div className="relative col-span-full h-80 bg-gray-50 w-full p-12 flex flex-col items-center justify-center">
          <h3 className="font-semibold text-xl">No Review found</h3>
          <p className="text-zinc-500 text-sm">
            We found no associated with reviews
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewRating;
