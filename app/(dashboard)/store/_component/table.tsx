"use client";
import { UseGetAllCategory } from "@/hooks/category/category.hook";
import React from "react";
import { columns } from "./table.columns";
import { Datatable } from "./data.table";

const CategoryTable = () => {
  const { data, isFetching, isLoading } = UseGetAllCategory();
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
