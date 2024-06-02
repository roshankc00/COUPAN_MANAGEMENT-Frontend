import React from "react";

const CategorySkeleton = () => {
  return (
    <div>
      <div className="relative animate-pulse">
        <div className="bg-gray-200 shadow-sm rounded-2xl h-[100px] w-[100px]"></div>
      </div>
    </div>
  );
};

export default CategorySkeleton;
