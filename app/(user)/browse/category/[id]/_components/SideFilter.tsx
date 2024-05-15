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

const SideFilter = ({ categoryId }: { categoryId: number }) => {
  const [filter, setfilter] = useState<number[]>([]);
  const [page, setpage] = useState({
    pageNo: 1,
    noOfPages: 10,
  });
  const {
    data: allsubCat,
    isLoading: subCatLoading,
    isFetching: subCatFetching,
  } = UseGetAllSubCategoryOfParticularCategory(categoryId);
  const {
    data: allCoupons,
    isLoading: couponLoading,
    isFetching: couponFetching,
    refetch,
  } = UseGetAllCouponsOfCatSubcat(
    categoryId,
    filter,
    page.pageNo,
    page.noOfPages
  );

  const handleChange = (id: number) => {
    if (filter.includes(id)) {
      const remProduct = filter.filter((item) => item !== id);
      setfilter(remProduct);
    } else {
      const allFilter = [...filter];
      allFilter.push(id);
      setfilter(allFilter);
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
                      setfilter([]);
                      _debounceSubmit();
                    }}
                    checked={filter.length === 0}
                  />
                  <label
                    htmlFor={`checkbox`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    All
                  </label>
                </li>
                {!subCatFetching &&
                  !subCatLoading &&
                  allsubCat?.map((option: ISubcategory) => {
                    return (
                      <li key={option.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`color-${option.id}`}
                          className="h-4 w-4  rounded border-gray-300 text-indigo-600 focus:text-indigo-600"
                          onChange={() => {
                            handleChange(option.id);
                          }}
                          checked={filter.includes(option.id)}
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
          {!couponFetching &&
            !couponLoading &&
            allCoupons?.coupons?.map((item: ICoupon) => (
              <Couponcard coupon={item} />
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
