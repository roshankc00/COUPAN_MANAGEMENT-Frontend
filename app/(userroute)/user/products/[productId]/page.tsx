import React from "react";
import Product from "./_components/Product";
import { getSingleProduct } from "@/common/api/products/products.api";
import { Metadata, ResolvingMetadata } from "next";

// export const metadata = {
//   title: "Product | NepQue ",
//   description: "NepQue: Your CouponPartner",
// };

export async function generateMetadata(
  { params }: { params: { productId: number } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.productId;

  // fetch data
  const product = await fetch(
    `https://api.nepque.com/api/v1/products/${id}`
  ).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const tags = product?.tags;
  let keywords = ["product"];
  if (tags && tags.length > 0) {
    keywords = [...keywords, ...tags];
  }
  return {
    title: product.title,
    description: product?.description,
    openGraph: {
      images: [product?.imageUrl, ...previousImages],
    },
    keywords,
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
