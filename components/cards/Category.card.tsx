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
      className="bg-white rounded-md shadow-sm flex items-center justify-center"
    >
      <img
        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${category?.imageName}`}
        alt=""
        className="shadow-sm rounded-2xl h-[100px] w-[100px]"
      />
    </Link>
  );
};

export default CategoryCard;
