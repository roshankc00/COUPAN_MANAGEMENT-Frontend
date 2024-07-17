import React from "react";
import SideFilter from "./_components/SideFilter";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { id: number } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const product = await fetch(
    `https://api.nepque.com/api/v1/category/${id}`
  ).then((res) => res.json());

  const previousImages = (await parent).openGraph?.images || [];

  let keywords = ["category", "nepque", product?.title, product.seo.title];

  return {
    title: `Nepque | ${product.seo.title}`,
    description: product?.seo?.description,
    openGraph: {
      images: [product?.imageUrl, ...previousImages],
    },
    keywords,
  };
}

const SingleCategoryBrowsePage = ({ params }: { params: { id: number } }) => {
  return <SideFilter categoryId={params.id} />;
};

export default SingleCategoryBrowsePage;
