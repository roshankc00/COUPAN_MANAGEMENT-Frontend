import React from "react";
import { Sidebar } from "./_component/Sidebar";
import MobileSideBar from "./_component/smallscreen.sidebar";
import TopNavbar from "./_component/TopNavbar";
type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-full w-full bg-[#f3f5f7] ">
      <div className="">
        <TopNavbar />
      </div>
      <main className=" mx-20 min-h-[89vh]">{children}</main>
    </div>
  );
};

export default DashboardLayout;