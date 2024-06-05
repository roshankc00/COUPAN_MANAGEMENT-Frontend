"use client";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { UseGetAllBlogs } from "@/hooks/react-query/blogs/get-all-blogs.hook";
import debounce from "lodash.debounce";
import React, { useCallback, useEffect } from "react";
import Pagination, { usePagination } from "@/components/ui/pagination";
import BlogSkeleton from "@/components/BlogSkeleton";

const AllBlogs = () => {
  const paginationProps = usePagination();
  const { data, isLoading, isFetching, refetch } = UseGetAllBlogs(
    paginationProps.currentPage,
    10
  );
  const onSubmit = () => refetch();

  const debouncedSubmit = debounce(onSubmit, 400);
  const _debounceSubmit = useCallback(debouncedSubmit, []);

  useEffect(() => {
    _debounceSubmit();
  }, [paginationProps.currentPage]);
  return (
    <div>
      <h1 className="my-10 mt-10 text-3xl font-medium text-center">
        Our Blogs
      </h1>
      <div className="grid grid-cols-3 gap-4 gap-y-4 mt-20">
        {!isLoading &&
          !isFetching &&
          data?.blogs?.map((item: any) => (
            <div key={item.id}>
              <Card className="p-3 rounded-md shadow-sm">
                <CardTitle>
                  <img
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${item?.thumbnail}`}
                    alt=""
                    className="w-full h-full"
                  />
                </CardTitle>
                <CardDescription className="px-4">
                  <div>
                    <div className="flex gap-3 flex-wrap mb-2">
                      <h5 className="text-blue-600">Free Shipping</h5>
                      <h5>11 min read</h5>
                    </div>
                    <h1 className="text-xl text-black">{item?.title}</h1>
                  </div>
                </CardDescription>
              </Card>
            </div>
          ))}

        {isLoading &&
          isFetching &&
          new Array(12)
            .fill(null)
            .map((el, index) => <BlogSkeleton key={index} />)}
      </div>
      <div className="flex justify-center mt-10">
        {!isFetching && !isLoading && data?.totalPage && (
          <Pagination {...paginationProps} totalPages={data?.totalPage} />
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
