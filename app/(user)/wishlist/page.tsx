import React from "react";
import ListWishlists from "./_components/List.Item";

export const metadata = {
  title: "Wishlist | NepQue ",
  description: "NepQue: Your CouponPartner",
};
const WishlistPage = () => {
  return (
    <div>
      <ListWishlists />
    </div>
  );
};

export default WishlistPage;
