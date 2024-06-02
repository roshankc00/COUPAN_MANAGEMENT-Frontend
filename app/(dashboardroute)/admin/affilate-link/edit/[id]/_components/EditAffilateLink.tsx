"use client";
import React, { useEffect } from "react";

import { UseGetSingleAffilateLink } from "@/hooks/react-query/affilate-link/get-single.affilatelink";
import EditAffilateLinkForm from "./EditAffilateLinkForm";

type Props = {
  id: number;
};

function EditAffilateLink({ id }: Props) {
  const {
    data: singleData,
    isFetching: singleDataFetching,
    isLoading: singleDataLoading,
  } = UseGetSingleAffilateLink(id);

  return (
    <main>
      {!singleDataFetching && !singleDataLoading && (
        <EditAffilateLinkForm id={id} singleData={singleData} />
      )}
    </main>
  );
}

export default EditAffilateLink;
