"use client";
import { UseGetSingleProduct } from "@/hooks/react-query/products/get-single-product";
import React, { useEffect } from "react";
import ProductDetails from "./ProductDetails";
type Props = {
  productId: number;
};
const Product: React.FC<Props> = ({ productId }) => {
  const {
    data: productItem,
    isFetching: singleProductFetching,
    isLoading: singleProductLoading,
    refetch,
  } = UseGetSingleProduct(+productId);
  useEffect(() => {
    refetch();
  }, [productId]);
  return (
    <div>
      {!singleProductFetching && !singleProductLoading && (
        <ProductDetails productId={productId} productItem={productItem} />
      )}
    </div>
  );
};

export default Product;
