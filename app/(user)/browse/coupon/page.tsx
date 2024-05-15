import React from "react";
import SideFilter from "./_components/SideFilter";

export const metadata = {
  title: "Coupon | NepQue ",
  description: "NepQue: Your CouponPartner",
};

const SingleCategoryBrowsePage = ({ params }: { params: { id: number } }) => {
  return <SideFilter categoryId={params.id} />;
};

export default SingleCategoryBrowsePage;
