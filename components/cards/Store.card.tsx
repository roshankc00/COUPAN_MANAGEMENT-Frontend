"use client";
import { increaseCount } from "@/common/api/affilate-link/affilate-link.api";
import { getUserLoginStatus } from "@/common/api/api";
import { IStore } from "@/interfaces/Store.interface";
import { IRootState } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

type Props = {
  store: IStore;
};

const StoreCard: React.FC<Props> = ({ store }) => {
  const { isLogedInStatus, userId } = useSelector(
    (state: IRootState) => state.auth
  );
  const router = useRouter();
  // const { mutateAsync, isPending } = useMutation({
  //   mutationFn: increaseCount,
  // });
  // // const handleNavigate = () => {
  // //   if (isLogedInStatus) {
  // //     mutateAsync(store?.affiliateLink.id);
  // //     window.open(`${store.affiliateLink.link}?subId1=${userId}`, "_blank");
  // //   } else {
  // //     router.push(
  // //       `/user/alert?alert=${store?.affiliateLink.link}&id=${store?.affiliateLink?.id}&cashbackAmountPer=${store?.affiliateLink?.cashbackAmountPer}`
  // //     );
  // //   }
  // // };

  return (
    <div
      className="shadow-md rounded-2xl bg-white p-5 cursor-pointer hover:-translate-y-2 transition-all  flex flex-col items-center justify-center"
      onClick={() => router.push(`/user/browse/store/${store.id}`)}
    >
      <img
        src={`${store?.imageUrl}`}
        alt=""
        className="shadow-sm  h-[150px] w-[150px] cursor-pointer rounded-full"
      />
      <h1 className="text-center mt-2 text-gray-500">{store.title}</h1>
      <h1 className=" font-bold text-center my-2">
        {store?.affiliateLink?.tagLine}
      </h1>
    </div>
  );
};

export default StoreCard;
