import React from "react";
import Product from "./_components/Product";
import { getSingleProduct } from "@/common/api/products/products.api";

export async function generateMetadata({
  params,
}: {
  params: { productId: number };
}) {
  const { data } = await getSingleProduct(+params.productId);
  const ogImageUrl = data?.imageUrl;
  return {
    title: `${data?.title} | NepQue`,
    description: `Buy Supscription or giftcard`,
    keywords: [
      "Coupon-store",
      "store",
      "discount",
      "Coupons",
      "subscription",
      "gift-card",
    ],
    openGraph: {
      images: [ogImageUrl],
    },
    ["og:image"]: ogImageUrl,
  };
}

const ProductPage = ({ params }: { params: { productId: number } }) => {
  return (
    <div>
      <Product productId={params.productId} />
    </div>
  );
};

export default ProductPage;
