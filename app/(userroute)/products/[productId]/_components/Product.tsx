"use client";
import { UseGetSingleProduct } from "@/hooks/react-query/products/get-single-product";
import React, { useEffect } from "react";
import ProductDetails from "./ProductDetails";
import { redirect, useRouter } from "next/navigation";
type Props = {
  productId: number;
};
const Product: React.FC<Props> = ({ productId }) => {
  const router = useRouter();
  const {
    data: productItem,
    isFetching: singleProductFetching,
    isLoading: singleProductLoading,
    refetch,
  } = UseGetSingleProduct(+productId);
  useEffect(() => {
    refetch();
  }, [productId]);
  if (!productItem && !singleProductFetching && !singleProductLoading) {
    router.back();
  }
  return (
    <div>
      {!singleProductFetching && !singleProductLoading && (
        <ProductDetails productId={productId} productItem={productItem} />
      )}
    </div>
  );
};

export default Product;
