import React from "react";
import ReviewRating from "./_components/ReviewRating";

const SingleCouponPage = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <ReviewRating id={params.id} />
    </div>
  );
};

export default SingleCouponPage;
