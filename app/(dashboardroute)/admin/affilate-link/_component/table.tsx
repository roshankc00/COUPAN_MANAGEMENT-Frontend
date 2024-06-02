"use client";
import React from "react";
import { columns } from "./table.columns";
import { Datatable } from "./data.table";
import { UseGetAllStore } from "@/hooks/react-query/stores/get_all_store_hook";
import { UseGetAllSubCategory } from "@/hooks/react-query/sub-categories/get_all_sub-categories.hook";
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
