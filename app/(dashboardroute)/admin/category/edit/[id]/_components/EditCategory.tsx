"use client";
import React, { useEffect } from "react";
import EditCategoryForm from "./EditCategoryForm";
import { UseGetSingleCategory } from "@/hooks/react-query/categories/get-single-category";

type Props = {
  id: number;
};

const EditCategory = ({ id }: Props) => {
  const {
    data: singleData,
    isFetching: singleDataFetching,
    isLoading: singleDataLoading,
    refetch,
  } = UseGetSingleCategory(id);
  useEffect(() => {
    refetch();
  }, []);
  return (
    <div>
      {!singleDataLoading && !singleDataFetching && (
        <EditCategoryForm id={id} singleData={singleData} />
      )}
    </div>
  );
};

export default EditCategory;
