import React from "react";
import LicenseTable from "./_component/table";
import LoginUserOnly from "@/components/permissions/LoginUserOnly";

const AllMyLicenses = () => {
  return (
    <LoginUserOnly>
      <LicenseTable />
    </LoginUserOnly>
  );
};

export default AllMyLicenses;
