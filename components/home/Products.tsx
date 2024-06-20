"use client";
import { IStore } from "@/interfaces/Store.interface";
import React from "react";
import StoreCardSkeleton from "../cards/StoreCardSkeleton";
import { UseGetHomePageProducts } from "@/hooks/react-query/products/get-home-page.product";
import ProductCard from "../cards/ProductCard";

const FeaturedProduct = () => {
  const { isFetching, isLoading, data } = UseGetHomePageProducts();
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg-px-8 my-10">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-10 place-content-center">
        {isLoading &&
          isFetching &&
          new Array(4)
            .fill(null)
            .map((el, index) => <StoreCardSkeleton key={index} />)}

        {!isLoading &&
          !isFetching &&
          data?.map((item: any) => (
            <ProductCard key={item?.id} product={item} />
          ))}
      </div>
    </main>
  );
};

export default FeaturedProduct;
