"use client";
import React from "react";
import { columns } from "./table.columns";
import { Datatable } from "./data.table";
import { UseGetAllStore } from "@/hooks/react-query/stores/get_all_store_hook";
import { UseGetAllSubCategory } from "@/hooks/react-query/sub-categories/get_all_sub-categories.hook";
import TableSkeleton from "@/components/TableSkeleton";
import { UseGetAllFAQS } from "@/hooks/react-query/faqs/get-all-faqs";
import { UseGetAllLicenses } from "@/hooks/react-query/license/get-all-license";

const LicenseTable = () => {
  const { data, isFetching, isLoading } = UseGetAllLicenses();
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
