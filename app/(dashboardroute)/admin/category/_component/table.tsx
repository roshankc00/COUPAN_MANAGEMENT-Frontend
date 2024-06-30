"use client";
import { UseGetAllCategory } from "@/hooks/react-query/categories/get_all_category.hook";
import React from "react";
import { columns } from "./table.columns";
import { Datatable } from "./data.table";
import TableSkeleton from "@/components/TableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryTable = () => {
  const { data, isFetching, isLoading } = UseGetAllCategory();
  return (
    <div className="w-full">
      {!isFetching && !isLoading ? (
        <Datatable columns={columns} data={data} />
      ) : (
        <div className="w-full">
          <TableSkeleton />
        </div>
      )}
    </div>
  );
};

export default CategoryTable;
