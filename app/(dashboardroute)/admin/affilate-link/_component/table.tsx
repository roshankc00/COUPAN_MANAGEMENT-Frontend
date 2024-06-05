"use client";
import React from "react";
import { columns } from "./table.columns";
import { Datatable } from "./data.table";
import TableSkeleton from "@/components/TableSkeleton";
import { UseGetAllAffilateLink } from "@/hooks/react-query/affilate-link/get-all.affilate-link";

const AffilateLinkTable = () => {
  const { data, isFetching, isLoading } = UseGetAllAffilateLink();
  return (
    <div className="">
      {!isFetching && !isLoading ? (
        <Datatable columns={columns} data={data as any} />
      ) : (
        <div className="w-full mt-10">
          <TableSkeleton />
        </div>
      )}
    </div>
  );
};

export default AffilateLinkTable;
