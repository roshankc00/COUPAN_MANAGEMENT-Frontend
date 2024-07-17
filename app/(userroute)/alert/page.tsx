"use client";
import AlertLoginForm from "@/app/(auth)/login/_component/AlertLoginForm";
import { increaseCount } from "@/common/api/affilate-link/affilate-link.api";
import { IRootState } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const AlertPage = () => {
  const { isLogedInStatus, userId } = useSelector(
    (state: IRootState) => state.auth
  );
  const searchParams = useSearchParams();
  const alert = searchParams.get("alert");
  const id = searchParams.get("id");
  const cashbackAmountPer = searchParams.get("cashbackAmountPer");
  const { mutateAsync, isPending } = useMutation({
    mutationFn: increaseCount,
  });
  useEffect(() => {
    if (isLogedInStatus) {
      mutateAsync(+id!);
      window.open(`${alert}?subId1=${userId}`, "_blank");
    }
  }, [isLogedInStatus]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg-px-8 mb-10 z-0">
      <div className="flex justify-center mt-10 flex-col items-center border p-5">
        <h1 className="text-5xl text-center mb-5 flex justify-center items-center text-blue-700">
          Join for free and earn {cashbackAmountPer}% Cash Back when you shop at
          Macys.
        </h1>
        <AlertLoginForm />
      </div>
    </div>
  );
};

export default AlertPage;
