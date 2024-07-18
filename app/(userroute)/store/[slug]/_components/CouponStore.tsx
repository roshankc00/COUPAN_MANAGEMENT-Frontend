"use client";
import { UseGetStoreInfoWithSlug } from "@/hooks/react-query/stores/get-store.withslug";
import React, { useEffect } from "react";
import CouponStoreDetails from "./CouponsStoreDetails";
import { useRouter } from "next/navigation";

type Props = {
  slug: string;
};

const CouponStore: React.FC<Props> = ({ slug }) => {
  const router = useRouter();
  const { data, isFetching, isLoading, refetch } =
    UseGetStoreInfoWithSlug(slug);

  if (!isFetching && !isLoading && !data) {
    router.back();
  }

  return (
    <div>
      {!isFetching && !isLoading && <CouponStoreDetails storeId={data?.id} />}
    </div>
  );
};

export default CouponStore;
