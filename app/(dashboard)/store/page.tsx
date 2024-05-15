import React from "react";
import CategoryTable from "./_component/table";

export const metadata = {
  title: "Store | NepQue ",
  description: "NepQue: Your CouponPartner",
};

const StoresPage = () => {
  return (
    <div className="flex justify-center">
      <div>
        <CategoryTable />
      </div>
    </div>
  );
};

export default StoresPage;
