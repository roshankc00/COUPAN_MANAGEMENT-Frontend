import React from "react";

import CouponStore from "./_components/CouponsStore";
import { Separator } from "@/components/ui/separator";
import { getSingleStoreInfo } from "@/common/api/stores/store.api";
import axios from "axios";

export async function generateMetadata({ params }: { params: { id: number } }) {
  const { data } = await axios.get(`/store/${params?.id}`);

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
const SingleStoreBrowsePage = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <CouponStore storeId={params.id} />
    </div>
  );
};

export default SingleStoreBrowsePage;
