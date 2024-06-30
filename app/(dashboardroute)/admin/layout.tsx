import React from "react";
import TopNavbar from "./_component/TopNavbar";
import AdminUserOnly from "@/components/permissions/AdminUserOnly";
import { Sidebar } from "./_component/Sidebar";
type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <AdminUserOnly>
      <div className="h-full">
        <div className="hidden md:flex h-full w-60 flex-col fixed inset-y-0 z-50">
          <Sidebar />
        </div>
        <main className="md:pl-64 px-2 min-h-[100vh]">{children}</main>
      </div>
    </AdminUserOnly>
  );
};

export default DashboardLayout;
