"use client";
import { UseGetStoreInfoWithSlug } from "@/hooks/react-query/stores/get-store.withslug";
import React, { useEffect } from "react";
import CouponStoreDetails from "./CouponsStoreDetails";
import { useRouter } from "next/navigation";

type Props = {
  slug: string;
};

const CouponStore: React.FC<Props> = ({ slug }) => {
  return <div>{<CouponStoreDetails storeSlug={slug} />}</div>;
};

export default CouponStore;
