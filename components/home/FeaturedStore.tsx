"use client";
import { IStore } from "@/interfaces/Store.interface";
import React from "react";
import StoreCard2 from "../cards/Store.card";
import { UseGetLatestStores } from "@/hooks/react-query/stores/get-latest-store";
import StoreCardSkeleton from "../cards/StoreCardSkeleton";

const FeaturedStore = () => {
  const { isFetching, isLoading, data } = UseGetLatestStores();
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg-px-8 my-10">
      <div className="grid grid-cols-2  sm:grid-cols-3 xl:grid-cols-4 sm:gap-10 gap-x-3 gap-y-3 place-content-center">
        {isLoading &&
          isFetching &&
          new Array(4)
            .fill(null)
            .map((el, index) => <StoreCardSkeleton key={index} />)}

        {!isLoading &&
          !isFetching &&
          data?.map((item: IStore) => (
            <div key={item?.id}>
              <StoreCard2 store={item} />
            </div>
          ))}
      </div>
    </main>
  );
};

export default FeaturedStore;
