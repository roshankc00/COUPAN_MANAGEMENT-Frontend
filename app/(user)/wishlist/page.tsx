import React from "react";
import ListWishlists from "./_components/List.Item";
import Image from "next/image";
import axios from "axios";

const WishlistPage = () => {
  return (
    <div>
      <ListWishlists />
      <Image
        src="http://localhost:8000/api/v1/images/76845b4a-2ad9-4ad1-bfee-f4e8e5971e4e.jpg"
        alt="Image"
        height={200}
        width={200}
      />
    </div>
  );
};

export default WishlistPage;
