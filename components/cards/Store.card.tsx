import { IStore } from "@/interfaces/Store.interface";
import Link from "next/link";
import React from "react";

type Props = {
  store: IStore;
};

const StoreCard: React.FC<Props> = ({ store }) => {
  return (
    <Link
      href={`/user/browse/store/${store.id}`}
      className="shadow-sm rounded-2xl"
    >
      <img
        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${store?.imageName}`}
        alt=""
        className="shadow-sm rounded-2xl h-[100px] w-[200px]"
      />
    </Link>
  );
};

export default StoreCard;
