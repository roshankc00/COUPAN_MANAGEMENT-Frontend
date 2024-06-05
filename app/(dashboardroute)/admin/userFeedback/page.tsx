import React from "react";
import FeedbacksTable from "../offer/_component/table";
import AdminHeader from "../_component/Header";
export const metadata = {
  title: "UserFeed-back | NepQue ",
  description: "NepQue: Your CouponPartner",
};
const page = () => {
  return (
    <div>
      <div className="mt-10 pr-24 -mb-[15px]">
        <AdminHeader title="user-feedbacks" />
      </div>
      <div>
        <FeedbacksTable />
      </div>
    </div>
  );
};

export default page;
