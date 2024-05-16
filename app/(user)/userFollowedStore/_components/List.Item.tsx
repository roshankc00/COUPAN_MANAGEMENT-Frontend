"use client";
import { UseGetAllFollowedStore } from "@/hooks/react-query/stores/get-all-followed-store";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import React from "react";
import AlpaStore from "../../browse/store/_component/Alpa";
import { IStore } from "@/interfaces/Store.interface";

const ListWishlists = () => {
  const router = useRouter();
  const { data } = UseGetAllFollowedStore();
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg-px-8 my-16">
      <h1 className="text-2xl font-medium my-10">Followed Stores </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-content-center">
        {data?.stores?.map((item: IStore) => (
          <div
            className="flex items-center justify-between shadow-sm rounded-md px-4 border border-slate-200"
            onClick={() => router.push(`/browse/category/${item.id}`)}
          >
            <div className="flex gap-3 items-center">
              <img
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${item?.imageName}`}
                alt=""
                className="h-20 w-20"
              />
              <div>
                <h1 className="text-[16px] font-medium">{item.title}</h1>
              </div>
            </div>
            <FaHeart color="red" />
          </div>
        ))}
      </div>
      <h1 className="text-2xl font-medium my-10">Recommended Store</h1>
      <AlpaStore />
    </main>
  );
};

export default ListWishlists;
