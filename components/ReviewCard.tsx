import React from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const ReviewCard = ({ data }: any) => {
  return (
    <div>
      <Card className="p-5 rounded-md shadow-sm my-3">
        <CardTitle>
          <div className="flex gap-2 items-center">
            <div className="bg-blue-600 text-white h-10 w-10 rounded-full flex justify-center items-center">
              <h1 className="capitalize">{data.user.name[0]}</h1>
            </div>
            <h1 className="capitalize">{data?.user?.name}</h1>
          </div>
          <div className="flex gap-2 my-3">
            {[...Array(data?.rating)].map((_, index) => (
              <FaStar key={index} color="orange" />
            ))}
            {[...Array(5 - data?.rating)].map((_, index) => (
              <CiStar key={index} color="orange" />
            ))}
          </div>
        </CardTitle>
        <CardDescription>
          <p className="text-black text-[16px]">{data?.content}</p>
        </CardDescription>
      </Card>
    </div>
  );
};

export default ReviewCard;
