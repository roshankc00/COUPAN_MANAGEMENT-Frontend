"use client";
import { UseGetAllStore } from "@/hooks/react-query/stores/get_all_store_hook";
import { IStore } from "@/interfaces/Store.interface";
import React from "react";
import StoreCard2 from "../cards/Store.card";

const FeaturedStore = () => {
  const { isFetching, isLoading, data } = UseGetAllStore();
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg-px-8 my-10">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-10 place-content-center">
        {!isLoading &&
          !isFetching &&
          data?.map((item: IStore) => <StoreCard2 store={item} />)}
      </div>
    </main>
  );
};

export default FeaturedStore;
