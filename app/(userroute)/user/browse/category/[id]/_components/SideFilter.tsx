"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import debounce from "lodash.debounce";
import { UseGetAllSubCategoryOfParticularCategory } from "@/hooks/react-query/sub-categories/getAllsubcategories-of-category";
import { UseGetAllCouponsOfCatSubcat } from "@/hooks/react-query/coupons/get_all_coupons_cat-subcat.hook ";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ISubcategory } from "@/interfaces/Subcategory.interface";
import { ICoupon } from "@/interfaces/coupon.interface";
import Pagination, { usePagination } from "@/components/ui/pagination";
import CouponCard from "@/components/cards/Coupon.card";
import EmptyStateFilter from "@/components/EmptyFilterState";
import CouponSkeletonCard from "@/components/cards/CouponSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

const SideFilter = ({ categoryId }: { categoryId: number }) => {
  const paginationProps = usePagination();
  const [filter, setfilter] = useState<number[]>([]);
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
    paginationProps.currentPage,
    30
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
  useEffect(() => {
    _debounceSubmit();
  }, [paginationProps.currentPage]);
  return (
    <main className="mx-auto max-w-7xl px-1">
      <div className="grid grid-cols-10 sm:grid-cols-7 gap-5">
        <div className="col-span-4 sm:col-span-2 hidden sm:block shadow-sm rounded-md">
          <div className="shadow-sm p-3 rounded-md bg-slate-50 ">
            <h1 className="mb-3 font-medium">All SubCategory</h1>
            <Separator />
            <div className="mt-3">
              <ScrollArea className="h-[300px] w-full rounded-md  p-4">
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
              </ScrollArea>
            </div>
          </div>
        </div>

        <div className="sm:hidden block w-[90vw]  my-5 ">
          <Select onValueChange={(val) => console.log(val)}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select the SubCategory" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-[150px] w-full rounded-md  p-4">
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
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-10 sm:col-span-5">
          <div className="grid grid-cols-1     lg:grid-cols-1 gap-x-2 gap-y-4">
            {couponFetching &&
              couponLoading &&
              new Array(12)
                .fill(null)
                .map((el, index) => <CouponSkeletonCard key={index} />)}
            {!couponFetching &&
              !couponLoading &&
              allCoupons?.coupons?.map((item: ICoupon) => (
                <CouponCard key={item.id} coupon={item} />
              ))}
            {!couponFetching &&
              !couponLoading &&
              allCoupons?.coupons?.length <= 0 && <EmptyStateFilter />}
          </div>
          {!couponFetching && !couponLoading && allCoupons?.totalPage && (
            <Pagination
              {...paginationProps}
              totalPages={allCoupons?.totalPage}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default SideFilter;
