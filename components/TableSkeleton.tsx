import React from "react";
import { Skeleton } from "./ui/skeleton";

const TableSkeleton = () => {
  const rows = 15;
  const cols = 6;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <Skeleton className="h-10 w-[30%] col-span-2 bg-gray-200" />
        <Skeleton className="h-10 w-[10%] col-span-1 bg-gray-200" />
      </div>
      <div className="border rounded-md p-4">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-6 gap-4 mb-4">
            {Array.from({ length: cols }).map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-6 w-full bg-gray-200" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
