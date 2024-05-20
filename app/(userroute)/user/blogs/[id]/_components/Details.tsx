"use client";
import { useState, useEffect } from "react";
import { Preview } from "@/components/Preview";
import { UseGetSingleBlog } from "@/hooks/react-query/blogs/get-single-blog.hook";
import React from "react";

type Props = {
  id: number;
};

const BlogDetails: React.FC<Props> = ({ id }) => {
  const { data, isFetching, isLoading } = UseGetSingleBlog(id);
  const [activeItemId, setActiveItemId] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const blogItems = document.querySelectorAll(".blog-item");
      let activeId: number | null = null;

      blogItems.forEach((item: any) => {
        const rect = item.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          activeId = parseInt(item.getAttribute("data-id") || "");
        }
      });

      setActiveItemId(activeId);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg-px-8">
      {!isFetching && !isLoading && (
        <div className="grid grid-cols-3 place-content-center">
          <div className="col-span-1">
            <h1 className="text-2xl font-medium mb-5">In This Article </h1>
            {data?.blogItems.map((item: any) => (
              <div key={item.id} className={`my-2 `} data-id={item.id}>
                <h1
                  className={`text-[16px] font-medium ${
                    activeItemId === item.id
                      ? " border-l-2 border-black text-black"
                      : "text-gray-600"
                  }`}
                >
                  <span className="ms-2">{item.title}</span>
                </h1>
              </div>
            ))}
          </div>
          <div className="col-span-2">
            {data?.blogItems?.map((item: any) => (
              <div key={item.id}>
                <h1
                  data-id={item.id}
                  className={`blog-item ${
                    activeItemId === item.id
                      ? " border-b-2 border-black text-black"
                      : ""
                  }`}
                >
                  {item.title}
                </h1>
                {item?.imageName && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${item?.imageName}`}
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
