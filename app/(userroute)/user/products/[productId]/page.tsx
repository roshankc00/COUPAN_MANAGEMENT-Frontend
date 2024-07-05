import React from "react";
import Product from "./_components/Product";
import { getSingleProduct } from "@/common/api/products/products.api";
export async function generateMetadata(
  { params }: { params: { productId: string } },
  parent?: { openGraph?: { images: string[] } }
): Promise<{
  title: string;
  description: string;
  keywords: string[];
  openGraph: { images: string[] };
}> {
  const id = params.productId;
  const { data } = await getSingleProduct(+id);

  const ogImageUrl = data?.imageUrl;

  // Ensure optional chaining for parent and openGraph.images
  const previousImages = parent?.openGraph?.images || [];

  return {
    title: data?.title,
    description: data?.description,
    keywords: data?.tags,
    openGraph: {
      images: [ogImageUrl, ...previousImages],
    },
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
