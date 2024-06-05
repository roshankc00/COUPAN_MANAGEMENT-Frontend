import React from "react";
import ListWishlists from "./_components/List.Item";

export const metadata = {
  title: "Followed-Store | NepQue ",
  description: "NepQue: Your CouponPartner",
};

const UserFollowedStorePage = () => {
  return (
    <div>
      <ListWishlists />
    </div>
  );
};

export default UserFollowedStorePage;
