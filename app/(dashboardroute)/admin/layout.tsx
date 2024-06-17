import React from "react";
import TopNavbar from "./_component/TopNavbar";
import AdminUserOnly from "@/components/permissions/AdminUserOnly";
type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-full w-full bg-[#f3f5f7] ">
      <AdminUserOnly>
        <div className="">
          <TopNavbar />
        </div>
        <main className=" mx-20 min-h-[89vh]">{children}</main>
      </AdminUserOnly>
    </div>
  );
};

export default DashboardLayout;
