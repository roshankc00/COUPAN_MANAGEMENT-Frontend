"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import debounce from "lodash.debounce";
import { UseGetAllSubCategoryOfParticularCategory } from "@/hooks/react-query/sub-categories/getAllsubcategories-of-category";
import Couponcard from "@/components/Coupon.card";
import { UseGetAllCouponsOfCatSubcat } from "@/hooks/react-query/coupons/get_all_coupons_cat-subcat.hook ";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ISubcategory } from "@/interfaces/Subcategory.interface";
import { ICoupon } from "@/interfaces/coupon.interface";
import { UseGetAllCategory } from "@/hooks/react-query/categories/get_all_category.hook";
import { UseGetAllCouponsOfCatStore } from "@/hooks/react-query/coupons/get-all-coupons-store-category";
import { UseGetAllStore } from "@/hooks/react-query/stores/get_all_store_hook";
import { ICategory } from "@/interfaces/category.interface";
import { IStore } from "@/interfaces/Store.interface";

type IFilter = {
  categoryIds: number[];
  storeIds: number[];
};
const SideFilter = ({ categoryId }: { categoryId: number }) => {
  const [filter, setfilter] = useState<IFilter>({
    categoryIds: [],
    storeIds: [],
  });
  const [page, setpage] = useState({
    pageNo: 1,
    noOfPages: 10,
  });
  const {
    data: allCat,
    isLoading: catLoading,
    isFetching: catFeteching,
  } = UseGetAllCategory();
  const {
    data: allStore,
    isLoading: storeLoading,
    isFetching: storeFeteching,
  } = UseGetAllStore();

  const {
    data: allCoupons,
    isLoading: couponLoading,
    isFetching: couponFetching,
    refetch,
  } = UseGetAllCouponsOfCatStore(
    filter.categoryIds,
    filter.storeIds,
    page.pageNo,
    page.noOfPages
  );

  const handleChange = (type: keyof IFilter, id: number) => {
    if (filter[type].includes(id)) {
      setfilter((prev) => ({
        ...prev,
        [type]: prev[type].filter((item) => item !== id),
      }));
    } else {
      setfilter((prev) => ({
        ...prev,
        [type]: [...prev[type], id],
      }));
    }
    _debounceSubmit();
  };
  const onSubmit = () => refetch();

  const debouncedSubmit = debounce(onSubmit, 400);
  const _debounceSubmit = useCallback(debouncedSubmit, []);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg-px-8">
      <div className="sm:grid grid-cols-7 ">
        <div className="col-span-2 hidden md:block">
          <div className="shadow-sm p-3 rounded-md bg-slate-50 ">
            <h1 className="mb-3 font-medium">All SubCategory</h1>
            <Separator />
            <div className="mt-3">
              <ul className="space-y-4">
                <li key="all" className="flex items-center">
                  <input
                    type="checkbox"
                    id={`color-${"all"}`}
                    className="h-4 w-4  rounded border-gray-300 text-indigo-600 focus:text-indigo-600"
                    onChange={() => {
                      setfilter({
                        ...filter,
                        categoryIds: [],
                      });
                      _debounceSubmit();
                    }}
                    checked={filter.categoryIds.length === 0}
                  />
                  <label
                    htmlFor={`checkbox`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    All
                  </label>
                </li>
                {!catFeteching &&
                  !catLoading &&
                  allCat?.map((option: ICategory) => {
                    return (
                      <li key={option.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`color-${option.id}`}
                          className="h-4 w-4  rounded border-gray-300 text-indigo-600 focus:text-indigo-600"
                          onChange={() => {
                            handleChange("categoryIds", option.id);
                          }}
                          checked={filter.categoryIds.includes(option.id)}
                        />
                        <label
                          htmlFor={`checkbox`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.title}
                        </label>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="shadow-sm p-3 rounded-md bg-slate-50 ">
            <h1 className="mb-3 font-medium">All Stores</h1>
            <Separator />
            <div className="mt-3">
              <ul className="space-y-4">
                <li key="all" className="flex items-center">
                  <input
                    type="checkbox"
                    id={`color-${"all"}`}
                    className="h-4 w-4  rounded border-gray-300 text-indigo-600 focus:text-indigo-600"
                    onChange={() => {
                      setfilter({
                        ...filter,
                        storeIds: [],
                      });
                      _debounceSubmit();
                    }}
                    checked={filter.storeIds.length === 0}
                  />
                  <label
                    htmlFor={`checkbox`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    All
                  </label>
                </li>
                {!storeLoading &&
                  !storeFeteching &&
                  allStore?.map((option: IStore) => {
                    return (
                      <li key={option.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`color-${option.id}`}
                          className="h-4 w-4  rounded border-gray-300 text-indigo-600 focus:text-indigo-600"
                          onChange={() => {
                            handleChange("storeIds", option.id);
                          }}
                          checked={filter.storeIds.includes(option.id)}
                        />
                        <label
                          htmlFor={`checkbox`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.title}
                        </label>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-span-7 md:col-span-5">
          {allCoupons?.coupons?.map((item: ICoupon) => (
            <>
              <Couponcard coupon={item} />
            </>
          ))}
          <div className="flex items-center gap-4 justify-center mt-10 border border-slate-100 p-2 rounded-md my-10">
            <p>
              Page {allCoupons?.currentPage} of {allCoupons?.totalPage}
            </p>
            <Button
              variant={"ghost"}
              disabled={page.pageNo === 1}
              className="flex  gap-1 items-center"
              onClick={() => {
                setpage({ ...page, pageNo: page.pageNo - 1 });
                _debounceSubmit();
              }}
            >
              <ArrowLeft className="h-4 w-4" /> Previous
            </Button>
            <Button
              variant={"ghost"}
              disabled={allCoupons?.totalPage <= page.pageNo}
              className="flex  gap-1 items-center"
              onClick={() => {
                setpage({ ...page, pageNo: page.pageNo + 1 });
                _debounceSubmit();
              }}
            >
              Next <ArrowRight className="h-4 w-4" />
            </Button>
            <Select
              onValueChange={(val: string) => {
                setpage({ pageNo: 1, noOfPages: Number(val) });
                _debounceSubmit();
              }}
              defaultValue={page.noOfPages.toString()}
            >
              <SelectTrigger className="w-[60px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent className="border border-black">
                <SelectItem value={"5"}>5</SelectItem>
                <SelectItem value={"1"}>1</SelectItem>
                <SelectItem value={"10"}>10</SelectItem>
                <SelectItem value={"15"}>15</SelectItem>
                <SelectItem value={"20"}>20</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SideFilter;