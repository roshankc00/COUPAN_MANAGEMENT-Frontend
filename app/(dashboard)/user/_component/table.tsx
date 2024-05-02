"use client";
import React from "react";
import { columns } from "./table.columns";
import { Datatable } from "./data.table";
import { UseGetAllUsers } from "@/hooks/react-query/users/get_all_user.hook";

const CategoryTable = () => {
  const { data, isFetching, isLoading } = UseGetAllUsers();
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
