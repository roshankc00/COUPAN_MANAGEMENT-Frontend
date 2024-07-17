import React from "react";

import CouponStore from "./_components/CouponsStore";
import { Separator } from "@/components/ui/separator";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { id: number } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const product = await fetch(`https://api.nepque.com/api/v1/store/${id}`).then(
    (res) => res.json()
  );

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

const SingleStoreBrowsePage = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <CouponStore storeId={params.id} />
    </div>
  );
};

export default SingleStoreBrowsePage;
