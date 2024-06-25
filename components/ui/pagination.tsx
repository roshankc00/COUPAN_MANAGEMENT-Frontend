import React, { SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  totalPages: number;
  handleDecreasePage: () => void;
  handleIncreasePage: (totalPages: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  handleIncreasePage,
  handleDecreasePage,
}: Props) => {
  const array = new Array(totalPages).fill(1).map((_, i) => i + 1);
  return (
    <section className="mx-auto mt-4 mb-12 flex px-2 py-3 gap-2">
      <button
        onClick={handleDecreasePage}
        className="rounded-md border hover:border-blue-700 transition-colors  text-black px-3 py-2 text-sm w-[100px]"
      >
        Previous
      </button>
      <div className="mx-auto flex w-[80%] flex-wrap items-center justify-center gap-3  md:mx-0 md:w-auto">
        {array.map((a) => (
          <p
            key={a}
            onClick={() => setCurrentPage(a)}
            className={cn(
              "cursor-pointer rounded-md border px-3 hover:border-blue-700 transition-colors py-2 text-sm ",
              currentPage === a && "bg-blue-700 text-white"
            )}
          >
            {a}
          </p>
        ))}
      </div>
      <button
        onClick={() => handleIncreasePage(totalPages)}
        className="rounded-md border px-3 transition-colors hover:border-blue-700 py-2 text-sm w-[100px]"
      >
        Next
      </button>
    </section>
  );
};

export default Pagination;

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleIncreasePage = (totalPages: number) => {
    if (currentPage === totalPages) return;
    setCurrentPage((prev) => prev + 1);
  };
  const handleDecreasePage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
  };
  return {
    currentPage,
    setCurrentPage,
    handleDecreasePage,
    handleIncreasePage,
  };
};
