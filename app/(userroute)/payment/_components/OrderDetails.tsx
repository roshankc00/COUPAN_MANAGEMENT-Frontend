"use client";
import { postPayment } from "@/common/api/payment/payment.api";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import PaymentCardSkeleton from "@/components/cards/PaymentCardSkeleton";
import LoginUserOnly from "@/components/permissions/LoginUserOnly";
import Image from "next/image";
import BlueQrImage from "@/public/blur-qr.png";

type Props = {
  orderId: number;
  orderDetails: any;
};

const QrComponent: React.FC<Props> = ({ orderId, orderDetails }) => {
  const { name, userId } = useSelector((state: IRootState) => state.auth);
  const router = useRouter();
  const [qrcode, setQrcode] = useState("");
  const [websocketId, setWebsocketId] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: postPayment,
    onSuccess(data) {
      setQrcode(data?.qrCodeUrl);
      setWebsocketId(data?.websocketId);
      setTimeLeft(120); // Reset timer when fetching new QR code
      setIsExpired(false); // Reset expired state
    },
  });

  const generateQRCode = () => {
    mutateAsync({
      amount: +orderDetails?.subProduct?.price!,
      remark: `userId-${userId} name=${name}-orderId=${orderId}`,
    });
  };

  useEffect(() => {
    generateQRCode();
  }, [userId, name, orderId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          setIsExpired(true); // Set expired state when time is up
        }
        return prevTime > 0 ? prevTime - 1 : 0; // Decrease time left
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  console.log(qrcode);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const formattedTime = useMemo(() => formatTime(timeLeft), [timeLeft]);

  return (
    <div className="flex justify-center w-full">
      <LoginUserOnly>
        {isPending ? (
          <PaymentCardSkeleton />
        ) : (
          <Card className="py-10 px-10">
            <CardContent className="flex flex-col items-center  xl:flex-row gap-16 border rounded-3xl bg-gray-100 py-5 w-full">
              <div>
                <h1 className="text-2xl font-bold text-center xl:text-start">
                  Scan QR to Pay
                </h1>
                <h1 className="text-xl text-gray-500 text-center xl:text-start">
                  Use any UPI App in your Phone
                </h1>
                <div className="flex items-center flex-wrap gap-y-3  mt-4 gap-4">
                  <img
                    src="https://esewa.com.np/common/images/esewa_logo.png"
                    alt="Esewa"
                    className="bg-slate-600  w-16 rounded-xl p-1"
                  />
                  <img
                    src="https://khalti-static.s3.ap-south-1.amazonaws.com/cloudfront-cdn/jamara/web19/images/khalti-logo.svg"
                    alt="Khalti"
                    className=" w-16"
                  />
                  <img
                    src="https://www.imepay.com.np/assets/logo/ime-main.svg"
                    alt="Khalti"
                    className="w-16"
                  />
                  <div className="text-sm bg-blue-700 flex justify-between items-center rounded-lg font-bold text-white  p-1">
                    {" "}
                    AnyBankingApp
                  </div>
                </div>
              </div>
              <div>
                {isExpired ? (
                  <div className="relative flex justify-center">
                    <Image
                      src={BlueQrImage}
                      alt="Blue Image"
                      height={228}
                      className="mt-10 opacity-20"
                      width={228}
                    />
                    <Button
                      onClick={generateQRCode}
                      className="absolute top-[50%] left-[50%] translate-x-[-50%] mt-5 translate-y-[-50%]"
                    >
                      Regenerate QR Code
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col items-center justify-center mt-5">
                      {qrcode && <img src={qrcode} alt="QR Code" />}
                    </div>
                    <h1 className="text-center text-[18px] font-bold">
                      Valid for
                      <span className="text-red-600 text-[18px] font-bold px-3 py-1 rounded-md">
                        {formattedTime}
                      </span>
                    </h1>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
        <Button
          className="mt-5 w-full"
          onClick={() => router.push(`/transection?orderId=${orderId}`)}
        >
          Continue
        </Button>
      </LoginUserOnly>
    </div>
  );
};

export default QrComponent;
