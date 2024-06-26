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
    <div className="mt-10">
      <div className="mt-10 pr-24 -mb-[15px]">
        <AdminHeader title="Order-Details" />
      </div>
      <div className="ms-20">
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
                  <h1 className="my-2"> Product</h1>
                  <Input
                    value={`${data?.subProduct?.product?.title}(${data?.subProduct?.title})`}
                  />
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
                  <Button
                    className="w-[150px] mt-3"
                    onClick={() => {
                      router.push(`/admin/license/new?orderId=${data?.id}`);
                    }}
                  >
                    Add New License
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <Button
                className="w-[150px] mt-3"
                onClick={() => handleVerifyOrder()}
              >
                Accept Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetails;
