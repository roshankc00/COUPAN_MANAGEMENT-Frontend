import React from "react";
import Product from "./_components/Product";
import { getSingleProduct } from "@/common/api/products/products.api";

interface ParentMetadata {
  openGraph?: {
    images: string[];
  };
}

export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}) {
  const id = params.productId;
  const response = await fetch(`https://api.nepque.com/api/v1/products/${id}`);
  const result = await response.json();
  const data = result.data;

  const title = data.name || `Product ${id}`;
  const description =
    data.description || `Detailed information about Product ${id}`;
  const keywords = ["Product", ...(data.tags?.map((tag: string) => tag) || [])];

  const ogImageUrl = data.imageUrl;
  // const openGraphImages = ogImageUrl
  //   ? [ogImageUrl, ...(parent.openGraph?.images || [])]
  //   : [...(parent.openGraph?.images || [])];

  return {
    title,
    description,
    keywords,
    openGraph: {
      images: [...ogImageUrl],
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
