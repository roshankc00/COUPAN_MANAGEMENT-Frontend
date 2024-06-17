"use client";
import { useState, useEffect } from "react";
import { Preview } from "@/components/Preview";
import { UseGetSingleBlog } from "@/hooks/react-query/blogs/get-single-blog.hook";
import React from "react";
import Link from "next/link";

type Props = {
  id: number;
};

const BlogDetails: React.FC<Props> = ({ id }) => {
  const { data, isFetching, isLoading } = UseGetSingleBlog(id);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg-px-8">
      {!isFetching && !isLoading && (
        <div className="grid grid-cols-2 place-content-center">
          <div
            className={`col-span-1 fixed  border px-10 rounded-md py-5 pb-10  top-36`}
          >
            <h1 className="text-2xl font-medium mb-5">In This Article </h1>
            {data?.blogItems.map((item: any) => (
              <Link
                href={`#${item.title}`}
                key={item.id}
                className={`my-2  block`}
                data-id={item.id}
              >
                <span className={`text-[16px] font-medium }`}>
                  <span className="ms-2">{item.title}</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="col-span-2 ms-[33%]">
            {data?.blogItems?.map((item: any) => (
              <div key={item.id} id={`${item?.title}`}>
                <h1
                  data-id={item.id}
                  className={`blog-item text-2xl font-semibold
                `}
                >
                  {item.title}
                </h1>
                {item?.imageUrl && (
                  <img
                    src={`${item?.imageUrl}`}
                    alt=""
                    className="w-full h-[300px]"
                  />
                )}
                <div className="text-xl">
                  <Preview value={item?.content} />
                </div>
              </div>
            ))}
          </div>
          <h1></h1>
        </div>
      )}
    </div>
  );
};
export default BlogDetails;
