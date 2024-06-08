"use client";
import { IRootState } from "@/store";
import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

interface Props {
  children: React.ReactNode;
}
const LoginUserOnly = ({ children }: Props) => {
  const { isLogedInStatus } = useSelector((state: IRootState) => state.auth);
  return <div>{isLogedInStatus ? children : redirect("/login")}</div>;
};

export default LoginUserOnly;
