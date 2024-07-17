import React, { useState } from "react";

import { NextPage } from "next";
import AlpaStore from "./_component/Alpa";

export const metadata = {
  title: "Store | NepQue ",
  description: "NepQue: Your CouponPartner",
};
const StorePage: NextPage = () => {
  return (
    <div>
      <h1 className="text-3xl  font-medium my-10">
        Coupons, Promo Codes & Deals by Store
      </h1>
      <AlpaStore />
    </div>
  );
};

export default StorePage;
