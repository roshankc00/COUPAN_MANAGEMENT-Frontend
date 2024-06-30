import React from "react";

type Props = {
  title: string;
};
const AdminHeader: React.FC<Props> = ({ title }) => {
  return (
    <div className="text-secondary-main mb-2 flex items-center px-9">
      <div className="font-medium capitalize ms-2">{title}</div>
      <div className="border-secondary-light h-1 flex-grow border-0 border-b border-solid"></div>
      <div className="flex h-[20px] items-center rounded-full bg-[#d9d9d9aa] px-4  py-3 text-[12px] text-[#5E5E5E]">
        Dashboard <span className="mx-2">/</span> {title}
      </div>
    </div>
  );
};
export default AdminHeader;
