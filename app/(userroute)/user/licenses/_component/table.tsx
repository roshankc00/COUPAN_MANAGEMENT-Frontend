"use client";
import React from "react";
import { columns } from "./table.columns";
import { Datatable } from "./data.table";
import TableSkeleton from "@/components/TableSkeleton";
import { UseGetMyLicenses } from "@/hooks/react-query/license/get-all-my-licenses";

const LicenseTable = () => {
  const { data, isFetching, isLoading } = UseGetMyLicenses();
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

export default LicenseTable;
