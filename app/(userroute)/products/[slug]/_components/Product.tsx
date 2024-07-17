"use client";
import { UseGetSingleProduct } from "@/hooks/react-query/products/get-single-product";
import React, { useEffect } from "react";
import ProductDetails from "./ProductDetails";
import { redirect, useRouter } from "next/navigation";
import { UseGetProductwithSlug } from "@/hooks/react-query/products/get-product-with-slug";
type Props = {
  slug: string;
};
const Product: React.FC<Props> = ({ slug }) => {
  const router = useRouter();
  const {
    data: productItem,
    isFetching: singleProductFetching,
    isLoading: singleProductLoading,
    refetch,
  } = UseGetProductwithSlug(slug);
  useEffect(() => {
    refetch();
  }, [slug]);
  if (!productItem && !singleProductFetching && !singleProductLoading) {
    router.back();
  }
  return (
    <div>
      {!singleProductFetching && !singleProductLoading && (
        <ProductDetails slug={slug} productItem={productItem} />
      )}
    </div>
  );
};

export default Product;
