import React from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { Skeleton } from "./ui/skeleton";

const ReviewCardSkeleton = ({ data }: any) => {
  return (
    <div>
      <Card className="p-5 rounded-md shadow-sm my-3">
        <CardTitle>
          <div className="flex gap-2 items-center">
            <div className="h-10 w-10 rounded-full flex justify-center items-center">
              <Skeleton className="h-10 w-10 rounded-full bg-gray-200" />
            </div>
            <Skeleton className="h-4 w-32 bg-gray-200" />
          </div>
          <div className="flex gap-2 my-3">
            <Skeleton className="h-4 w-28 bg-gray-200" />
          </div>
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-[20vw] mt-4 bg-gray-200 " />
        </CardDescription>
      </Card>
    </div>
  );
};

export default ReviewCardSkeleton;
