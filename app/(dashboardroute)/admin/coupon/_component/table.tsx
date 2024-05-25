"use client";
import React from "react";
import { columns } from "./table.columns";
import { Datatable } from "./data.table";
import { UseGetAllStore } from "@/hooks/react-query/stores/get_all_store_hook";
import { UseGetAllCoupons } from "@/hooks/react-query/coupons/get_all_coupons.hook";
import TableSkeleton from "@/components/TableSkeleton";

const CategoryTable = () => {
  const { data, isFetching, isLoading } = UseGetAllCoupons();
  console.log(data);

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