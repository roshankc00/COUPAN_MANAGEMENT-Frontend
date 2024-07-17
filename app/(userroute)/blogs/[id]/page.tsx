import React from "react";
import BlogDetails from "./_components/Details";

const SingleBlogPage = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <BlogDetails id={params.id} />
    </div>
  );
};

export default SingleBlogPage;
