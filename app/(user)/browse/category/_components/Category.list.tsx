"use client";
import { UseGetAllCategory } from "@/hooks/react-query/categories/get_all_category.hook";
import { ICategory } from "@/interfaces/category.interface";
import { Component } from "lucide-react";
import React from "react";

const Categorylist = () => {
  const { data, isLoading, isFetching } = UseGetAllCategory();
  return (
    <div>
      <h1 className="text-3xl  font-medium my-10">
        Coupons, Promo Codes & Deals by Category
      </h1>
      <div className="grid grid-cols-4">
        {data?.map((el: ICategory) => {
          return (
            <div className="flex shadow-md gap-5 p-4 rounded-sm">
              <Component />
              <h1>{el.title}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categorylist;
