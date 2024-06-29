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
  product: any;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const router = useRouter();
  return (
    <div
      className="shadow-md rounded-2xl bg-white p-5 cursor-pointer hover:-translate-y-2 transition-all flex flex-col justify-center items-center  "
      onClick={() => router.push(`/user/products/${product.id}`)}
    >
      <img
        src={`${product?.imageUrl}`}
        alt=""
        className="shadow-sm  h-[200px]   cursor-pointer rounded-md"
      />
      <h1 className="text-center mt-4 text-[16px] font-bold">
        {product?.title}
      </h1>
    </div>
  );
};

export default ProductCard;
