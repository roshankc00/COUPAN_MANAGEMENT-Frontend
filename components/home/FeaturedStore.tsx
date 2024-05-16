"use client";
import { UseGetAllStore } from "@/hooks/react-query/stores/get_all_store_hook";
import { IStore } from "@/interfaces/Store.interface";
import React from "react";

const FeaturedStore = () => {
  const { isFetching, isLoading, data } = UseGetAllStore();
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg-px-8 my-16">
      {data && (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-10 ">
          {!isFetching &&
            !isLoading &&
            data?.map((item: IStore) => (
              <div className="border border-slate-200 flex justify-center items-center rounded-md h-[150px] w-[200px]">
                <img
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${item?.imageName}`}
                  alt=""
                  className="h-30 w-30"
                />
              </div>
            ))}
        </div>
      )}
    </main>
  );
};

export default FeaturedStore;
