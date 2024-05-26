"use client";
import React, { useState } from "react";
import { UseGetAllStore } from "@/hooks/react-query/stores/get_all_store_hook";
import { useRouter } from "next/navigation";
import { IStore } from "@/interfaces/Store.interface";
import StoreCard from "@/components/cards/Store.card";

const AlpaStore = () => {
  const { data, isFetching, isLoading } = UseGetAllStore();
  const router = useRouter();
  return (
    <div className="px-2">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 place-content-center">
        {!isLoading &&
          !isFetching &&
          data?.map((item: IStore) => {
            return <StoreCard store={item} />;
          })}
      </div>
    </div>
  );
};

export default AlpaStore;
