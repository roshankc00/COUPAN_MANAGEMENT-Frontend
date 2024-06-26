import React from "react";
import SideFilter from "./_components/SideFilter";
import { getSingleCategory } from "@/common/api/categories/category.api";
import { Metadata } from "next";
import axios from "axios";

export async function generateMetadata({ params }: { params: { id: number } }) {
  const { data } = await axios.get(`/category/${params.id}`);

  if (!data) {
    return null;
  }

  return {
    title: `${data?.title} | NepQue`,
    description: data?.description,
    keywords: [
      "Coupon-store",
      `${data?.title}`,
      "store",
      "discount",
      "Coupons",
      "subscription",
      "gift-card",
    ],
    openGraph: {
      images: [data?.imageUrl],
    },
  };
}
const SingleCategoryBrowsePage = ({ params }: { params: { id: number } }) => {
  return <SideFilter categoryId={params.id} />;
};

export default SingleCategoryBrowsePage;
