"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
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
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ISubcategory } from "@/interfaces/Subcategory.interface";
import { ICoupon } from "@/interfaces/coupon.interface";
import { UseGetAllCategory } from "@/hooks/react-query/categories/get_all_category.hook";
import { UseGetAllCouponsOfCatStore } from "@/hooks/react-query/coupons/get-all-coupons-store-category";
import { UseGetAllStore } from "@/hooks/react-query/stores/get_all_store_hook";
import { ICategory } from "@/interfaces/category.interface";
import { IStore } from "@/interfaces/Store.interface";
import Pagination, { usePagination } from "@/components/ui/pagination";
import { SkeletonCouponCard } from "@/components/CouponCard.skeleton";
import CouponCard from "@/components/cards/Coupon.card";
type IFilter = {
  categoryIds: number[];
  storeIds: number[];
};
const SideFilter = ({ categoryId }: { categoryId: number }) => {
  const [filter, setfilter] = useState<IFilter>({
    categoryIds: [],
    storeIds: [],
  });
  const paginationProps = usePagination();
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
    paginationProps.currentPage,
    10
  );

  useEffect(() => {
    _debounceSubmit();
  }, [paginationProps.currentPage]);

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
    <main className="mx-auto max-w-7xl px-1">
      <div className="sm:grid grid-cols-9 ">
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

        <div className="col-span-9 md:col-span-7">
          <div className="grid grid-cols-1  md:grid-cols-3 gap-x-2 gap-y-4">
            {couponFetching &&
              couponLoading &&
              new Array(12)
                .fill(null)
                .map((el, index) => <SkeletonCouponCard key={index} />)}

            {!couponFetching &&
              !couponLoading &&
              allCoupons?.coupons?.map((item: ICoupon) => (
                <>
                  <CouponCard coupon={item} />
                </>
              ))}
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
