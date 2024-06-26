import React from "react";

import CouponStore from "./_components/CouponsStore";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Store | NepQue ",
  description: "NepQue: Your CouponPartner",
};
const SingleStoreBrowsePage = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <CouponStore storeId={params.id} />
    </div>
  );
};

export default SingleStoreBrowsePage;
