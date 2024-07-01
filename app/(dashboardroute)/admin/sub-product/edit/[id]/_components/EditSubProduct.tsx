"use client";
import { UseGetSingleProduct } from "@/hooks/react-query/products/get-single-product";
import React, { useEffect } from "react";
import EditProductForm from "./EditSubductForm";
import { UseGetSingleSubProduct } from "@/hooks/react-query/sub-products/get-single-subProduct";
type Props = {
  id: number;
};
const EditSubProduct: React.FC<Props> = ({ id }) => {
  const { data, isFetching, isLoading, refetch } = UseGetSingleSubProduct(id);
  console.log(data);
  useEffect(() => {
    refetch();
  }, [id]);
  return (
    <div>
      {!isLoading && !isFetching && (
        <EditProductForm id={+id} singleData={data} />
      )}
    </div>
  );
};

export default EditSubProduct;
