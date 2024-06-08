"use client";
import { IRootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
interface Props {
  children: React.ReactNode;
}
const AdminUserOnly = ({ children }: Props) => {
  const { role } = useSelector((state: IRootState) => state.auth);
  return <div>{role === "ADMIN" ? children : redirect("/")}</div>;
};

export default AdminUserOnly;
