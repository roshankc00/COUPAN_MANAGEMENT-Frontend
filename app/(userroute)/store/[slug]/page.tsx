import React from "react";

import { Separator } from "@/components/ui/separator";
import { Metadata, ResolvingMetadata } from "next";
import CouponStore from "./_components/CouponStore";

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata | null> {
  const slug = params.slug;

  const product = await fetch(
    `https://api.nepque.com/api/v1/store/get/with-slug?slug=${slug}`
  ).then((res) => res.json());
  if (!product?.title) {
    return null;
  }
  const previousImages = (await parent).openGraph?.images || [];

  let keywords = ["store", "", product?.title, product.seo.title];

  return {
    title: `Nepque | ${product.seo.title}`,
    description: product?.seo?.description,
    openGraph: {
      images: [product?.imageUrl, ...previousImages],
    },
    keywords,
  };
}

const SingleStoreBrowsePage = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <CouponStore slug={params.slug} />
    </div>
  );
};

export default SingleStoreBrowsePage;
