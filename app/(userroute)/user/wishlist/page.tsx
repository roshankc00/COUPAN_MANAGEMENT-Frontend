import React from "react";
import ListWishlists from "./_components/List.Item";
import LoginUserOnly from "@/components/permissions/LoginUserOnly";

export const metadata = {
  title: "Wishlist | NepQue ",
  description: "NepQue: Your CouponPartner",
};
const WishlistPage = () => {
  return (
    <LoginUserOnly>
      <ListWishlists />
    </LoginUserOnly>
  );
};

export default WishlistPage;
