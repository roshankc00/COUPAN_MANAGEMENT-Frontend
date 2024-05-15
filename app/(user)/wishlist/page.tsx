import React from "react";
import ListWishlists from "./_components/List.Item";
import Image from "next/image";
import axios from "axios";

const WishlistPage = () => {
  return (
    <div>
      <ListWishlists />
    </div>
  );
};

export default WishlistPage;
