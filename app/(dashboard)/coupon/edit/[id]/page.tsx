import React from "react";
import EditCoupon from "./_components/EditCoupon";

const EditCouponPage = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <EditCoupon id={params.id} />
    </div>
  );
};

export default EditCouponPage;
