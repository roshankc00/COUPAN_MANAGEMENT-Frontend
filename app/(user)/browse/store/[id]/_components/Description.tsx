"use client";
import { Separator } from "@/components/ui/separator";
import { UseGetStoreInfo } from "@/hooks/react-query/stores/get-single-store";
import React from "react";

type Props = {
  storeId: number;
};

const Description: React.FC<Props> = ({ storeId }) => {
  const { data, isFetching, isLoading } = UseGetStoreInfo(storeId);
  return (
    <div>
      <div className="border border-slate-200 p-2 rounded-md  ">
        <div className="flex justify-center items-center ">
          <img
            src="https://cdn0.dontpayfull.com/media/logos/size/160x160/brighton.com..jpg?v=20220628144652202906"
            alt=""
            className="h-3/3 w-3/3"
          />
        </div>
        <h1 className="text-center font-bold texxt-2xl">{data?.title}</h1>
      </div>
      <div className="border border-slate-200 p-2 rounded-md mt-5">
        <p className="capitalize">
          <h4 className="font-bold my-2 text-center">About us</h4>
          <Separator />
          <p className="p-2">{data?.description}</p>
        </p>
      </div>
    </div>
  );
};

export default Description;
