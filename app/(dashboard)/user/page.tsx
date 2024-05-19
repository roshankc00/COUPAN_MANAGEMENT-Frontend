import React from "react";
import CategoryTable from "./_component/table";
import AdminHeader from "../_component/Header";

export const metadata = {
  title: "User | NepQue ",
  description: "NepQue: Your CouponPartner",
};

const UsersPage = () => {
  return (
    <div className="">
      <div className="mt-10 pr-24 -mb-[15px]">
        <AdminHeader title="User" />
      </div>
      <div>
        <CategoryTable />
      </div>
    </div>
  );
};

export default UsersPage;
