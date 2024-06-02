import React from "react";

const StoreCardSkeleton = () => {
  return (
    <div>
      <div className="relative animate-pulse">
        <div className="bg-gray-200 shadow-sm rounded-2xl h-[100px] w-[200px]"></div>
      </div>
    </div>
  );
};

export default StoreCardSkeleton;
