"use client";
import React, { useEffect } from "react";

import { UseGetSingleSubCategory } from "@/hooks/react-query/sub-categories/get_single_sub-category";
import EditSubCategoryForm from "./EditSubCategoryForm";

type Props = {
  id: number;
};

function EditSubCategory({ id }: Props) {
  const {
    data: singleData,
    isFetching: singleDataFetching,
    isLoading: singleDataLoading,
    refetch,
  } = UseGetSingleSubCategory(id);

  useEffect(() => {
    refetch();
  }, []);
  return (
    <main>
      {!singleDataFetching && !singleDataLoading && (
        <EditSubCategoryForm id={id} singleData={singleData} />
      )}
    </main>
  );
}

export default EditSubCategory;
