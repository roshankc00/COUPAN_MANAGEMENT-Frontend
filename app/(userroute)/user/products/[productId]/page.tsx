import React from "react";
import Product from "./_components/Product";
import { getSingleProduct } from "@/common/api/products/products.api";

export const metadata = {
  title: "Product | NepQue ",
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
