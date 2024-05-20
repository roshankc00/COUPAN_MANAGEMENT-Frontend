"use client";
import React from "react";
import { columns } from "./table.columns";
import { Datatable } from "./data.table";
import { UseGetAllUsers } from "@/hooks/react-query/users/get_all_user.hook";
import TableSkeleton from "@/components/TableSkeleton";

const CategoryTable = () => {
  const { data, isFetching, isLoading } = UseGetAllUsers();
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
