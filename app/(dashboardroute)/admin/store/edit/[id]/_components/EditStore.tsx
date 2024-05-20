"use client";
import React from "react";
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
  } = UseGetStoreInfo(id);
  return (
    <div>
      {!singleDataFetching && !singleDataLoading && (
        <EditStoreForm id={id} singleData={singleData} />
      )}
    </div>
  );
};

export default EditStrore;
