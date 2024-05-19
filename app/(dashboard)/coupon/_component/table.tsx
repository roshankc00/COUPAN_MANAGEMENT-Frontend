"use client";
import React from "react";
import { columns } from "./table.columns";
import { Datatable } from "./data.table";
import { UseGetAllStore } from "@/hooks/react-query/stores/get_all_store_hook";
import { UseGetAllCoupons } from "@/hooks/react-query/coupons/get_all_coupons.hook";

const CategoryTable = () => {
  const { data, isFetching, isLoading } = UseGetAllCoupons();
  console.log(data);

  return (
    <div className="">
      {!isFetching && !isLoading ? (
        <Datatable columns={columns} data={data} />
      ) : (
        <h1> Loading</h1>
      )}
    </div>
  );
};

export default CategoryTable;
