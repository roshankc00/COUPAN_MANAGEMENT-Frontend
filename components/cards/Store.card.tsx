import { IStore } from "@/interfaces/Store.interface";
import React from "react";

type Props = {
  store: IStore;
};

const StoreCard2: React.FC<Props> = ({ store }) => {
  return (
    <div className="shadow-sm rounded-2xl">
      <img
        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${store?.imageName}`}
        alt=""
        className="shadow-sm rounded-2xl h-[100px] w-[200px]"
      />
    </div>
  );
};

export default StoreCard2;
