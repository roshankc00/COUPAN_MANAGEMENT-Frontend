import React from "react";
import Product from "./_components/Product";
import { getSingleProduct } from "@/common/api/products/products.api";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata | null> {
  const slug = params.slug;

  const product = await fetch(
    `https://api.nepque.com/api/v1/products/get/with-slug?slug=${slug}`
  ).then((res) => res.json());

  if (!product?.title) {
    return null;
  }
  const previousImages = (await parent).openGraph?.images || [];

  const tags = product?.tags;
  let keywords = ["product", "Subscription", "gift-card"];
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

const ProductPage = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <Product slug={params.slug} />
    </div>
  );
};

export default ProductPage;
