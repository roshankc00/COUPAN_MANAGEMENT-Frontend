import { ICategory } from "@/interfaces/category.interface";
import Link from "next/link";
import React from "react";

interface Props {
  category: ICategory;
}
const CategoryCard: React.FC<Props> = ({ category }) => {
  return (
    <Link
      href={`/user/browse/category/${category.id}`}
      className="shadow-md rounded-2xl bg-white p-5 cursor-pointer hover:-translate-y-2 transition-all flex justify-center "
    >
      <img
        src={`${category?.imageUrl}`}
        alt=""
        className="shadow-sm rounded-2xl h-[100px] w-[100px]"
      />
    </Link>
  );
};

export default CategoryCard;
