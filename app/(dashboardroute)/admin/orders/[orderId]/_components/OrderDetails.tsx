import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import AdminHeader from "../../../_component/Header";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseGetAllLicenses } from "@/hooks/react-query/license/get-all-license";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { acceptLicenseOrder } from "@/common/api/license/license.api";
import { useRouter } from "next/navigation";
import { UseGetAllNotAssignedLicenses } from "@/hooks/react-query/license/get-all-notAssigned-licenses";
import { client } from "@/components/Provider";
import RejectOrderButton from "../../_component/RejectOrderBtn";
import AddLicenseFromOrder from "./AddLicenseFromOrder";

type Props = {
  data: any;
};

const OrderDetails: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const [selectedLicense, setselectedLicense] = useState<number>();
  const {
    data: allLicenses,
    isFetching: licenseFetching,
    isLoading: licenseLoading,
  } = UseGetAllNotAssignedLicenses();

  const { mutate } = useMutation({
    mutationFn: acceptLicenseOrder,
    onSuccess(data, variables, context) {
      client.invalidateQueries({ queryKey: ["get-all-my-orders"] });
      client.invalidateQueries({ queryKey: ["get-all-orders"] });
      client.invalidateQueries({ queryKey: ["get-all-licenses"] });
      client.invalidateQueries({
        queryKey: ["get-all-not-assigned-licenses"],
      });
      client.invalidateQueries({
        queryKey: ["get-single-order"],
      });
      client.invalidateQueries({ queryKey: ["get-all-my-licenses"] });
      toast.success("License assigned successfully");
    },
    onError() {
      toast.error("Unable to assign License ");
    },
  });
  const handleVerifyOrder = () => {
    if (!selectedLicense && data?.id) {
      toast.error("Select the license");
    } else {
      mutate({
        licenseId: +selectedLicense!,
        orderId: data?.id,
      });
    }
  };
  return (
    <div className="pt-10">
      <div className="">
        <AdminHeader title="Order-Details" />
        <RejectOrderButton id={data?.id} status={data?.status} />
      </div>
      <div className="mx-10">
        <Card>
          <CardContent className="">
            <div className="grid grid-cols-3 mt-10 gap-10 ">
              <div className="col-span-2">
                <div className="my-3">
                  <h1 className="my-2"> User Name </h1>
                  <Input value={data?.user.name} />
                </div>
                <div className="my-3">
                  <h1 className="my-2"> Email</h1>
                  <Input value={data?.user.email} />
                </div>
                <div className="my-3">
                  <h1 className="my-2"> Transection Id</h1>
                  <Input value={data?.transectionId || "No Transection Id"} />
                </div>
                <div className="my-3">
                  <h1 className="my-2"> Product</h1>
                  <Input
                    value={`${data?.subProduct?.product?.title}(${data?.subProduct?.title})`}
                  />
                </div>
                <div className="my-3">
                  <h1 className="my-2"> Order Details</h1>
                  <div className="border py-2 px-4 rounded-md shadow-sm">
                    {data?.orderDetails &&
                      Object.keys(data?.orderDetails) &&
                      Object.keys(data?.orderDetails).map((key, index) => (
                        <span key={index}>
                          {key}: {data?.orderDetails[key]}
                          {index !==
                            Object.keys(data?.orderDetails).length - 1 && ", "}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div>
                  <h1 className="my-2"> Amount</h1>
                  <Input value={data?.subProduct?.price} />
                </div>
                <div className="flex justify-end flex-col">
                  <div>
                    <h1 className="mt-3 mb-2">Select License</h1>
                    <Select
                      onValueChange={(value) => setselectedLicense(+value)}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select the License" />
                      </SelectTrigger>
                      <SelectContent>
                        {!licenseFetching &&
                          !licenseLoading &&
                          allLicenses?.map((item: any) => (
                            <SelectItem
                              value={item?.id?.toString()}
                              key={item.id}
                            >
                              {item.title}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-3">
                    {data?.subProduct?.id && (
                      <AddLicenseFromOrder
                        subProductId={data?.subProduct?.id}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Button
                className="w-[150px] mt-3"
                onClick={() => handleVerifyOrder()}
                disabled={
                  data?.status === "rejected" || data?.status === "completed"
                }
              >
                {data?.status === "pending" && "Accept Order"}
                {data?.status === "rejected" && "Order already rejected"}
                {data?.status === "completed" && "Accepted"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetails;
