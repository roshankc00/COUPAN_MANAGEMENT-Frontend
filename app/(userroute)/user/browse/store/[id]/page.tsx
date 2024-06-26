import React from "react";

import CouponStore from "./_components/CouponsStore";
import { Separator } from "@/components/ui/separator";
import { getSingleStoreInfo } from "@/common/api/stores/store.api";

export async function generateMetadata({ params }: { params: { id: number } }) {
  const { data } = await getSingleStoreInfo(+params.id);
  const ogImageUrl = data?.imageUrl;
  return {
    title: `${data?.title} | Store | NepQue`,
    description: `${data?.description}`,
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
      images: [ogImageUrl],
    },
    ["og:image"]: ogImageUrl,
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
