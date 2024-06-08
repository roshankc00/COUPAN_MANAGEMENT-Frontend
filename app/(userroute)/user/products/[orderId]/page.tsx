"use client";
import { postPayment } from "@/common/api/payment/payment.api";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import { useSearchParams } from "next/navigation";
import { Socket, io } from "socket.io-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PaymentCardSkeleton from "@/components/cards/PaymentCardSkeleton";

const QrComponent = ({ params }: { params: { orderId: number } }) => {
  const { name, userId } = useSelector((state: IRootState) => state.auth);
  const [qrcode, setQrcode] = useState("");
  const [websocketId, setWebsocketId] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const searchParams = useSearchParams();
  const orderprice = searchParams.get("price");
  const { mutateAsync, isPending } = useMutation({
    mutationFn: postPayment,
    onSuccess(data) {
      setQrcode(data?.qrCodeUrl);
      setWebsocketId(data?.websocketId);
      setTimeLeft(120); // Reset timer when fetching new QR code
    },
  });

  useEffect(() => {
    mutateAsync({
      amount: +orderprice!,
      remark: `userId-${userId} name=${name}-orderId=${params.orderId}`,
    });
  }, [mutateAsync, orderprice, userId, name, params.orderId]);

  useEffect(() => {
    let newSocket: Socket;

    if (websocketId !== "" && websocketId) {
      const createSocket = () => {
        newSocket = io(websocketId);

        newSocket.on("connect", () => {
          setIsConnected(true);
          console.log("connected ");
        });
        newSocket.on("message", (data) => {
          console.log("Message received from server:", data);
        });

        newSocket.on("disconnect", () => {
          setIsConnected(false);
          console.log("disconnected ");
        });
      };
      createSocket();
    }

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [websocketId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          // If time is up, refetch QR code
          mutateAsync({
            amount: +orderprice!,
            remark: `userId-${userId} name=${name}-orderId=${params.orderId}`,
          });
        }
        return prevTime > 0 ? prevTime - 1 : 0; // Decrease time left
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mutateAsync, orderprice, userId, name, params.orderId]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const formattedTime = useMemo(() => formatTime(timeLeft), [timeLeft]);

  return (
    <div className="flex justify-center">
      {isPending ? (
        <PaymentCardSkeleton />
      ) : (
        <Card className="w-[500px] py-5 px-2 ">
          <h1 className="flex flex-row-reverse w-full px-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-md">
              {formattedTime}
            </span>
          </h1>

          <CardContent>
            <div className="flex flex-col items-center justify-center mt-5">
              {qrcode && <img src={qrcode} alt="QR Code" />}
            </div>
            <h1 className="text-center text-[16px] font-bold">Scan to pay</h1>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QrComponent;
