"use client";
import { UseGetSingleProduct } from "@/hooks/react-query/products/get-single-product";
import React from "react";
import EditProductForm from "./EditProductForm";
type Props = {
  id: number;
};
const EditProduct: React.FC<Props> = ({ id }) => {
  const { data, isFetching, isLoading } = UseGetSingleProduct(id);
  return (
    <div>
      {!isLoading && !isFetching && (
        <EditProductForm id={+id} singleData={data} />
      )}
    </div>
  );
};

export default EditProduct;
