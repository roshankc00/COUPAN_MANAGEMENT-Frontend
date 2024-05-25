"use client";
import Couponcard from "@/components/Coupon.card";
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
import { Separator } from "@/components/ui/separator";
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
          <Couponcard coupon={data} />
        </div>
      )}
      <div className=" my-10 p-5 border">
        <div>
          <h1 className="my-10 font-bold text-2xl">What Our User Says </h1>
          {!statusLoading && (
            <div>
              {statusData?.map((item: any) => (
                <div className="flex gap-2 items-center justify-center my-10">
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
        <div className="my-10">
          <h1 className="text-2xl font-bold">Reviews and Rating</h1>
        </div>
        <div className="grid grid-cols-4 gap-5">
          <Input
            placeholder="Search For a  Review"
            className="col-span-3"
            value={searchText}
            onChange={(e) => {
              setsearchText(e.target.value);
              _debounceSubmit();
            }}
          />
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

        <div>
          {reviewFetching &&
            reviewLoading &&
            new Array(12)
              .fill(null)
              .map((el, index) => <ReviewCardSkeleton key={index} />)}
          {!reviewFetching &&
            !reviewLoading &&
            allReview?.reviews?.map((item: any) => <ReviewCard data={item} />)}
          {!reviewFetching && !reviewLoading && (
            <Pagination
              {...paginationProps}
              totalPages={allReview?.totalPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewRating;