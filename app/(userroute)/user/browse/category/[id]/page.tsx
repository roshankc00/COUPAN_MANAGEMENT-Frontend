import React from "react";
import SideFilter from "./_components/SideFilter";
import { getSingleCategory } from "@/common/api/categories/category.api";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> {
  const { data } = await getSingleCategory(+params.id);
  console.log(data, "haha");
  const ogImageUrl = data?.imageUrl;
  return {
    title: `${data?.title} | Category | NepQue`,
    description: `${data?.description}`,
    keywords: [
      "Coupon-Category",
      `${data?.title}`,
      "store",
      "discount",
      "Coupons",
      "subscription",
      "gift-card",
    ],
    openGraph: {
      images: [ogImageUrl],
    },
  };
}
const SingleCategoryBrowsePage = ({ params }: { params: { id: number } }) => {
  return <SideFilter categoryId={params.id} />;
};

export default SingleCategoryBrowsePage;
