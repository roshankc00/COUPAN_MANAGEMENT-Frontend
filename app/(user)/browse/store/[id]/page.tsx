import React from "react";
import Description from "./_components/Description";
import CouponStore from "./_components/CouponsStore";

const SingleStoreBrowsePage = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <div className="grid grid-cols-7 place-content-center">
        <div className="col-span-2">
          <Description storeId={params.id} />
        </div>
        <div className="my-10 col-span-5">
          <CouponStore storeId={params.id} />
        </div>
      </div>
    </div>
  );
};

export default SingleStoreBrowsePage;
