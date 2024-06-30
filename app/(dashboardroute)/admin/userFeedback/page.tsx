import React from "react";
import FeedbacksTable from "../offer/_component/table";
import AdminHeader from "../_component/Header";
export const metadata = {
  title: "UserFeed-back | NepQue ",
  description: "NepQue: Your CouponPartner",
};
const page = () => {
  return (
    <div className="">
      <div className="pt-10">
        <AdminHeader title="user-feedbacks" />
      </div>
      <div>
        <FeedbacksTable />
      </div>
    </div>
  );
};

export default page;
