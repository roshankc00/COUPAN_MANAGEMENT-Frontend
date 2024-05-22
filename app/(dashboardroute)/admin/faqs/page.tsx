import React from "react";
import FaqsTable from "./_component/table";
import AdminHeader from "../_component/Header";

const page = () => {
  return (
    <div>
      <div className="mt-10 pr-24 -mb-[15px]">
        <AdminHeader title="faqs" />
      </div>
      <div>
        <FaqsTable />
      </div>
    </div>
  );
};

export default page;
