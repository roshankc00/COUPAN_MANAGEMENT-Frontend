"use client";
import { getAllBlogs } from "@/common/api/blogs/blogs.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetAllBlogs = (page: number, pageSize: number) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getAllBlogs(page, pageSize),
  });
  return { data, isFetching, isLoading, refetch };
};
