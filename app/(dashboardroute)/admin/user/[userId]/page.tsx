"use client";
import React, { useEffect } from "react";
import AdminHeader from "../../_component/Header";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { UseGetSingleUser } from "@/hooks/react-query/users/get-single-user";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  changeRoleApi,
  toogleChangeUserVerificationApi,
  toogleDeactivateUserApi,
} from "@/common/api/users/user.api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { client } from "@/components/Provider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const UserDetails = ({ params }: { params: { userId: number } }) => {
  const { data, isFetching, isLoading, refetch } = UseGetSingleUser(
    params.userId
  );
  const router = useRouter();
  useEffect(() => {
    refetch();
  }, [params.userId]);
  const handleDeactiveUser = async () => {
    const data = await toogleDeactivateUserApi({ userId: +params.userId });
    toast.success("activation role changed successfully");
    client.invalidateQueries({ queryKey: ["users"] });
    router.push("/admin/user");
  };
  const handleChangeUserRole = async () => {
    await changeRoleApi({ userId: +params.userId });
    toast.success("Role Changed successfully");
    client.invalidateQueries({ queryKey: ["users"] });
    router.push("/admin/user");
  };
  const handleVerifyUser = async () => {
    await toogleChangeUserVerificationApi({ userId: +params.userId });
    toast.success("verification role Changed successfully");
    client.invalidateQueries({ queryKey: ["users"] });
    router.push("/admin/user");
  };
  return (
    <div className="pt-10">
      <AdminHeader title="User-Details" />
      <div>
        {!isFetching && !isLoading && data && (
          <Card className="mx-10 py-5">
            <CardContent>
              <CardTitle> Account Details</CardTitle>
              <Separator className="my-2" />
              <div className="grid grid-cols-2 gap-y-5">
                <h1 className="text-xl font-medium ">Name : {data?.name}</h1>
                <h1 className="text-xl font-medium ">Email : {data?.email}</h1>
                <h1 className="text-xl font-medium ">
                  PhoneNumber : {data?.phoneNumber}
                </h1>
                <h1 className="text-xl font-medium capitalize">
                  Active :
                  <Badge
                    className={cn({
                      "ms-4 bg-red-800": !data?.isActive,
                      "ms-4 bg-green-700": data?.isActive,
                    })}
                  >
                    {data?.isActive.toString()}
                  </Badge>
                </h1>
                <h1 className="text-xl font-medium capitalize ">
                  Verified:
                  <Badge
                    className={cn({
                      "ms-4 bg-red-800": !data?.isVerified,
                      "ms-4 bg-green-700": data?.isVerified,
                    })}
                  >
                    {data?.isVerified.toString()}
                  </Badge>
                </h1>
                <h1 className="text-xl font-medium  capitalize">
                  Role : {data?.role}
                </h1>
              </div>
              <Separator className="my-5" />

              <div className="flex justify-between gap-5 items-center">
                <Button
                  className="w-full"
                  onClick={() => handleChangeUserRole()}
                >
                  {data?.role === "USER"
                    ? "Change Role to Admin"
                    : "Change  Role to User"}
                </Button>
                <Button
                  onClick={() => handleDeactiveUser()}
                  className={cn({
                    "w-full bg-red-800": data?.isActive,
                    "w-full bg-green-700": !data?.isActive,
                  })}
                >
                  {" "}
                  {data?.isActive ? "Deactivate User" : "Activate User"}
                </Button>
                <Button
                  className={cn({
                    "w-full bg-red-800": data?.isVerified,
                    "w-full bg-green-700": !data?.isVerified,
                  })}
                  onClick={() => handleVerifyUser()}
                >
                  {data?.isVerified ? "UnVerify User" : "Verify User"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
