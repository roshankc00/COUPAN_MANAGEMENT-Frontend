import { Card, CardTitle } from "@/components/ui/card";
import React from "react";
import AllBlogs from "../../../(userroute)/user/blogs/_components/AllBlogs";

const Blogs = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg-px-8">
      <AllBlogs />
    </main>
  );
};

export default Blogs;
