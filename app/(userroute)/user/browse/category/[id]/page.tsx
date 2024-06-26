import React from "react";
import SideFilter from "./_components/SideFilter";
import { getSingleCategory } from "@/common/api/categories/category.api";

export async function generateMetadata({ params }: { params: { id: number } }) {
  const { data } = await getSingleCategory(+params.id);
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
    ["og:image"]: ogImageUrl,
  };
}
const SingleCategoryBrowsePage = ({ params }: { params: { id: number } }) => {
  return <SideFilter categoryId={params.id} />;
};

export default SingleCategoryBrowsePage;
