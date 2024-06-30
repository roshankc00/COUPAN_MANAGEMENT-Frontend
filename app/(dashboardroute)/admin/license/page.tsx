import React from "react";
import AdminHeader from "../_component/Header";
import LicenseTable from "./_component/table";

const page = () => {
  return (
    <div className="">
      <div className="pt-10">
        <AdminHeader title="License" />
      </div>
      <div>
        <LicenseTable />
      </div>
    </div>
  );
};

export default page;
