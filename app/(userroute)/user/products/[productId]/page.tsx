import React from "react";
import Product from "./_components/Product";

export const metadata = {
  title: "Products | NepQue ",
  description: "NepQue: Your CouponPartner",
};
const ProductPage = ({ params }: { params: { productId: number } }) => {
  return (
    <div>
      <Product productId={params.productId} />
    </div>
  );
};

export default ProductPage;
