import React from "react";
import { Sidebar } from "./_component/Sidebar";
import MobileSideBar from "./_component/smallscreen.sidebar";
type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-full w-full">
      <div className=" md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <div className="hidden  2xl:block">
          <Sidebar />
        </div>
        <div className="  sm:block    2xl:hidden  w-full ms-5 mt-10">
          <MobileSideBar />
        </div>
      </div>
      <main className="md:pl-52 h-full pt-[80px] mr-20 ">{children}</main>
    </div>
  );
};

export default DashboardLayout;
