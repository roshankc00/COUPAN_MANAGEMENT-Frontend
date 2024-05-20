"use client";
import { getAllBlogs, getSingleBlog } from "@/common/api/blogs/blogs.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetSingleBlog = (id: number) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["singleBlog"],
    queryFn: () => getSingleBlog(id),
  });
  return { data, isFetching, isLoading, refetch };
};
