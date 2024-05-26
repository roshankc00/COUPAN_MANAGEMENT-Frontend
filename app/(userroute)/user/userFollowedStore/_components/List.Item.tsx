"use client";
import { UseGetAllFollowedStore } from "@/hooks/react-query/stores/get-all-followed-store";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import React from "react";
import AlpaStore from "../../browse/store/_component/Alpa";
import { IStore } from "@/interfaces/Store.interface";
import StoreCard from "@/components/cards/Store.card";

const ListWishlists = () => {
  const router = useRouter();
  const { data, isLoading } = UseGetAllFollowedStore();
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg-px-8 my-16">
      <h1 className="text-2xl font-medium my-10">Followed Stores </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 place-content-center">
        {!isLoading &&
          data?.stores?.map((item: IStore) => <StoreCard store={item} />)}
      </div>
      <h1 className="text-2xl font-medium my-10">Recommended Store</h1>
      <AlpaStore />
    </main>
  );
};

export default ListWishlists;
