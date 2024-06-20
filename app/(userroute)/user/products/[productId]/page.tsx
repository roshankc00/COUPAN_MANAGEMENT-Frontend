import React from "react";
import ProductDetails from "./_components/ProductDetails";

export const metadata = {
  title: "Products | NepQue ",
  description: "NepQue: Your CouponPartner",
};
const ProductPage = ({ params }: { params: { productId: number } }) => {
  return (
    <div>
      <ProductDetails productId={params.productId} />
    </div>
  );
};

export default ProductPage;
