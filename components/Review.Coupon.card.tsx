"use client";
import React from "react";
import { Button } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { Input } from "./ui/input";
import { File } from "lucide-react";
import { ICoupon } from "@/interfaces/coupon.interface";
import { useRouter } from "next/navigation";

interface Props {
  coupon: ICoupon;
}

const ReviewCouponcard: React.FC<Props> = ({ coupon }) => {
  const router = useRouter();
  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied");
    } catch (err) {
      toast.success("Failed to copy");
    }
    //
  };

  return (
    <div onClick={() => router.push(`/user/browse/coupom/${coupon?.id}`)}>
      <div className="shadow-sm rounded-lg p-4 flex justify-between items-center border border-slate-200">
        <div className="flex items-center gap-5">
          <img src={`${coupon?.imageUrl}`} alt="" className="h-28 w-28" />
          <div>
            <h5
              className={`font-medium ${
                coupon?.verified ? "text-blue-600" : "text-red-600"
              }`}
            >
              {coupon?.verified ? "Verified" : "Not Verified"}
            </h5>
            <p className="description font-mono text-xl mt-1">
              {coupon?.description}
            </p>
            {/* <p className="deadline  text-gray-500 mt-2">{coupon?.expireDate}</p> */}
            <h1>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
              nemo.
            </h1>
          </div>
        </div>
        <div className="relative">
          {Boolean(coupon?.isDeal) && <Button>Deal</Button>}
          {!Boolean(coupon?.isDeal) && (
            <Dialog>
              <DialogTrigger>
                <Button> Get Code </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="my-3 text-center text-xl">
                    {coupon?.tagLine}
                  </DialogTitle>
                  <DialogDescription>
                    <Input className="text-xl" value={coupon?.code} />
                    <File
                      className="absolute right-8 top-[90px] cursor-pointer"
                      onClick={() => handleCopyToClipboard(coupon?.code)}
                    />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCouponcard;
