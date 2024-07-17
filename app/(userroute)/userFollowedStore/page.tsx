import React from "react";
import ListWishlists from "./_components/List.Item";
import LoginUserOnly from "@/components/permissions/LoginUserOnly";

export const metadata = {
  title: "Followed-Store | NepQue ",
  description: "NepQue: Your CouponPartner",
};

const UserFollowedStorePage = () => {
  return (
    <LoginUserOnly>
      <ListWishlists />
    </LoginUserOnly>
  );
};

export default UserFollowedStorePage;
