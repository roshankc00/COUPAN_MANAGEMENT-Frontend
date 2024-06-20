import React from "react";
import AllProducts from "./_components/AllProducts";

export const metadata = {
  title: "Products | NepQue ",
  description: "NepQue: Your CouponPartner",
};
const ProductPage = ({ params }: { params: { productId: number } }) => {
  return (
    <div>
      <AllProducts productId={params.productId} />
    </div>
  );
};

export default ProductPage;
