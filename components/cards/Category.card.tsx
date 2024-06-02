import { ICategory } from "@/interfaces/category.interface";
import React from "react";

interface Props {
  category: ICategory;
}
const CategoryCard: React.FC<Props> = ({ category }) => {
  return (
    <div className="bg-white rounded-md shadow-sm flex items-center justify-center">
      <div>
        <img
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${category?.imageName}`}
          alt=""
          className="shadow-sm rounded-2xl h-[100px] w-[100px]"
        />
      </div>
    </div>
  );
};

export default CategoryCard;
