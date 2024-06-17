"use client";
import React, { useCallback, useRef, useState } from "react";
import { Input } from "./ui/input";
import { File, Search } from "lucide-react";
import { useOnClickOutside } from "@/hooks/out-side.click";
import { UseSeachCategoryStore } from "@/hooks/react-query/stores/search-cat-store";
import { Separator } from "./ui/separator";
import debounce from "lodash.debounce";
import { IStore } from "@/interfaces/Store.interface";
import { ICategory } from "@/interfaces/category.interface";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
const SearchBar = () => {
  const [showSuggestions, setshowSuggestions] = useState(false);
  const [searchText, setsearchText] = useState("");
  const searchRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(searchRef, () => {
    setshowSuggestions(false);
  });
  const { data, isFetching, isLoading, refetch } =
    UseSeachCategoryStore(searchText);

  const onSubmit = () => refetch();

  const debouncedSubmit = debounce(onSubmit, 400);
  const _debounceSubmit = useCallback(debouncedSubmit, []);

  return (
    <Dialog>
      <div className="relative">
        <DialogTrigger>
          <div>
            <Input
              value={searchText}
              onChange={(e) => {
                setsearchText(e.target.value);
                _debounceSubmit();
              }}
              onFocus={() => setshowSuggestions(true)}
              className="w-[150px] sm:w-[250px] md:w-[500px] px-7"
              placeholder="Search for Store Coupon"
            />
            <Search className="absolute top-[13px] ms-2 h-4 w-5" />
          </div>
        </DialogTrigger>
        <DialogContent className="">
          <div className="relative mt-3">
            <Input
              value={searchText}
              onChange={(e) => {
                setsearchText(e.target.value);
                _debounceSubmit();
              }}
              onFocus={() => setshowSuggestions(true)}
              className="w-[95%] px-7"
              placeholder="Search for Store Coupon"
            />
            <Search className="absolute top-[12px] ms-2 h-4 w-5" />
          </div>
          <div className="">
            {showSuggestions && (
              <div
                className="border border-slate-200  bg-white rounded-md  shadow-md mx-3 px-2 pb-10
        "
              >
                {/* stores */}
                <ScrollArea className="h-[250px] w-full rounded-md  p-4">
                  <div>
                    <h1 className="font-medium text-[15px] mb-2 p-2 rounded-md my-2 ">
                      Stores
                    </h1>
                    {data?.stores?.map((item: IStore) => (
                      <div key={item.id}>
                        <Separator className="mb-2" />
                        <div className="flex justify-between items-center">
                          <div className="flex gap-3 items-center">
                            <img
                              src={`${item?.imageUrl}`}
                              alt="Image"
                              className="h-20 w-20"
                            />
                            <h1>{item.title}</h1>
                          </div>
                          <h1>{item?.coupons.length} Offers available</h1>
                        </div>
                        <Separator className="mb-2" />
                      </div>
                    ))}
                    {!isFetching &&
                      !isLoading &&
                      data?.stores?.length === 0 && (
                        <div className=" w-full flex flex-col justify-center items-center gap-4 py-4">
                          <File />
                          <h1>No Store Found</h1>
                        </div>
                      )}
                  </div>
                </ScrollArea>
                <Separator />
                <ScrollArea className="h-[250px] w-full rounded-md  p-4">
                  {/* categories */}
                  <div>
                    <h1 className="font-medium text-[15px] mb-2 p-2 rounded-md my-2 ">
                      Categories
                    </h1>
                    <div className="grid grid-cols-4  ">
                      {data?.categories?.map((item: ICategory) => (
                        <div
                          className="border border-slate-200 p-2 rounded-md flex justify-center items-center"
                          key={item.id}
                        >
                          <h1 className="text=[17px]">{item.title}</h1>
                        </div>
                      ))}
                    </div>
                    {!isFetching &&
                      !isLoading &&
                      data?.categories?.length === 0 && (
                        <div className=" w-full flex flex-col justify-center items-center gap-4 py-4">
                          <File />
                          <h1>No Categories Found</h1>
                        </div>
                      )}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default SearchBar;
