import React from "react";
import SideFilter from "./_components/SideFilter";
import ListItem from "./_components/ListItem";

const SingleCategoryBrowsePage = ({ params }: { params: { id: number } }) => {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg-px-8">
      <div className="sm:grid grid-cols-7 ">
        <div className="col-span-2 hidden md:block">
          <SideFilter categoryId={params.id} />
        </div>
        <div className="col-span-7 md:col-span-5 ">
          <ListItem categoryId={params.id} />
        </div>
      </div>
    </main>
  );
};

export default SingleCategoryBrowsePage;
