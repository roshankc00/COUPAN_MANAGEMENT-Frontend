import React from "react";
import SideFilter from "./_components/SideFilter";
import { Metadata, ResolvingMetadata } from "next";
import CategoryCoupon from "./_components/CategoryCoupon";

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata | null> {
  const slug = params.slug;

  const product = await fetch(
    `https://api.nepque.com/api/v1/category/get/with-slug?slug=${slug}`
  ).then((res) => res.json());

  if (!product?.title) {
    return null;
  }

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

const SingleCategoryBrowsePage = ({ params }: { params: { slug: string } }) => {
  return <CategoryCoupon slug={params.slug} />;
};

export default SingleCategoryBrowsePage;
