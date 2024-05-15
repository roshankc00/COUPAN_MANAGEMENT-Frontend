import React from "react";
import CategoryTable from "./_component/table";

export const metadata = {
  title: "Category | NepQue ",
  description: "NepQue: Your CouponPartner",
};

const CategoryPage = () => {
  return (
    <div className="flex justify-center">
      <div>
        <CategoryTable />
      </div>
    </div>
  );
};

export default CategoryPage;
