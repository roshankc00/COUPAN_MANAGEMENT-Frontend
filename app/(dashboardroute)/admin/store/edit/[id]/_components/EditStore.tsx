"use client";
import React, { useEffect } from "react";
import EditStoreForm from "./EditStoreForm";
import { UseGetStoreInfo } from "@/hooks/react-query/stores/get-single-store";

type Props = {
  id: number;
};
const EditStrore = ({ id }: Props) => {
  const {
    data: singleData,
    isFetching: singleDataFetching,
    isLoading: singleDataLoading,
    refetch,
  } = UseGetStoreInfo(id);
  useEffect(() => {
    refetch();
  }, []);
  return (
    <div>
      {!singleDataFetching && !singleDataLoading && (
        <EditStoreForm id={id} singleData={singleData} />
      )}
    </div>
  );
};

export default EditStrore;
