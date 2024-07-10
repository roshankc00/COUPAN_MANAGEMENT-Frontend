"use client";
import React from "react";
import { columns } from "./table.columns";
import { Datatable } from "./data.table";
import { UseGetAllStore } from "@/hooks/react-query/stores/get_all_store_hook";
import TableSkeleton from "@/components/TableSkeleton";
import { UseGetAllStoreForAdmin } from "@/hooks/react-query/stores/get_all_store_hook forAdmin";

const CategoryTable = () => {
  const { data, isFetching, isLoading } = UseGetAllStoreForAdmin();
  return (
    <div className="">
      {!isFetching && !isLoading ? (
        <Datatable columns={columns} data={data} />
      ) : (
        <div className="w-full mt-10">
          <TableSkeleton />
        </div>
      )}
    </div>
  );
};

export default CategoryTable;
