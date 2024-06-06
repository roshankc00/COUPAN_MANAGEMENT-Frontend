"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { IRootState } from "@/store";
import { ArrowLeft, Backpack } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const OrderSuccess = () => {
  const router = useRouter();
  const { name } = useSelector((state: IRootState) => state.auth);
  return (
    <div className=" flex justify-center mt-[10%]">
      <Card className="max-w-[500px] p-3 py-5 ">
        <CardTitle className="text-center text-blue-600">
          Order Sucess
        </CardTitle>
        <CardContent className="flex flex-col gap-2 items-center justify-center mt-4">
          <p>Dear {name}, your Order has been placed sucessfully</p>
          <p>Admin will verify and will notify You</p>
          <p>Thanks</p>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft /> Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;
