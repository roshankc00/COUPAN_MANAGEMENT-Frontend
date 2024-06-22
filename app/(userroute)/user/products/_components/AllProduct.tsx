"use client";
import CouponSkeletonCard from "@/components/cards/CouponSkeleton";
import ProductCard from "@/components/cards/ProductCard";
import StoreSkeleton from "@/components/cards/StoreCardSkeleton";
import { UseGetAllProducts } from "@/hooks/react-query/products/get-all-products";
import React from "react";

const AllProduct = () => {
  const { data, isFetching, isLoading } = UseGetAllProducts();
  return (
    <div>
      <h1 className="text-3xl text-blue-500 capitalize text-center mt-10 mb-5">
        All Products
      </h1>
      <div className="grid grid-cols-1  sm:grid-cols-4 gap-4 cursor-pointer">
        {isFetching &&
          isLoading &&
          data?.map((item: any) => <StoreSkeleton key={item.id} />)}
        {!isFetching &&
          !isLoading &&
          data?.map((item: any) => (
            <ProductCard product={item} key={item.id} />
          ))}
      </div>
    </div>
  );
};

export default AllProduct;
