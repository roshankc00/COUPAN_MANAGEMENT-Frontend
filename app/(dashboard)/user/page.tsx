import React from "react";
import CategoryTable from "./_component/table";

export const metadata = {
  title: "User | NepQue ",
  description: "NepQue: Your CouponPartner",
};

const UsersPage = () => {
  return (
    <div className="flex justify-center">
      <div>
        <CategoryTable />
      </div>
    </div>
  );
};

export default UsersPage;
