"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UseGetCurrentUser } from "@/hooks/react-query/users/get-current-user";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { UseChangeUserName } from "@/hooks/react-query/users/changeUserName";
import { Check } from "lucide-react";
import ChangePassword from "./_components/ChangePasswordForm";

const UserProfile = () => {
  const { data, isFetching, isLoading } = UseGetCurrentUser();
  const [userName, setuserName] = useState("");
  const [open, setopen] = useState(false);
  const [openChangePassword, setopenChangePassword] = useState(false);
  const changeUserName = UseChangeUserName();
  return (
    <div>
      <Card>
        <CardHeader className="text-xl font-bold">User Name</CardHeader>
        <Separator />
        <CardContent>
          <div className="flex gap-2 mt-5">
            <Input value={data?.name} />
          </div>
          <Dialog open={open} onOpenChange={setopen}>
            <DialogTrigger className=" my-5">
              <Button size={"sm"}>Edit</Button>
            </DialogTrigger>
            <DialogContent className="">
              <h1 className="mt-5">User Name</h1>
              <Input
                value={userName}
                placeholder="Enter the new Name"
                onChange={(e) => setuserName(e.target.value)}
              />
              <Button
                size={"sm"}
                onClick={() => {
                  if (userName?.length < 3) {
                    toast.error("User name should be atleast of 3 Charecter");
                  } else {
                    // post
                    changeUserName({ name: userName });
                    toast.success("User Name changed successfully");
                  }
                }}
              >
                Save
              </Button>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      <Card className="mt-10">
        <CardHeader className="text-xl font-bold">Email Address</CardHeader>
        <Separator />
        <CardContent>
          <div className="flex gap-10 items-center mt-5">
            <h1 className="text-[16px] font-medium">{data?.email}</h1>
            <span className="flex items-center gap-2">
              <Check /> Verified
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-10">
        <CardHeader className="text-xl font-bold">Password</CardHeader>
        <Separator />
        <CardContent>
          <div className="flex gap-10 items-center">
            <h1 className="text-3xl font-medium">.....................</h1>
          </div>
          <Dialog
            open={openChangePassword}
            onOpenChange={setopenChangePassword}
          >
            <DialogTrigger className=" my-5">
              <Button size={"sm"}>Change Password</Button>
            </DialogTrigger>
            <DialogContent className="">
              <ChangePassword />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
