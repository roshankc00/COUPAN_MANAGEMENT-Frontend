"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { postFaqs } from "@/common/api/faqs/faqs.api";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { client } from "@/components/Provider";
import { Button } from "@/components/ui/button";
import { UseGetAllOrderWithStatus } from "@/hooks/react-query/orders/get-all-orders-with-status";
import { updateLicense } from "@/common/api/license/license.api";
import AdminHeader from "@/app/(dashboardroute)/admin/_component/Header";
import { UseGetAllProducts } from "@/hooks/react-query/products/get-all-products";
import moment from "moment";
import DeleteLicenseButton from "../../../_component/Edit-Delete.button";

type Props = {
  id: number;
  singleData: any;
};
const EditLicenseForm: React.FC<Props> = ({ id, singleData }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramid = searchParams.get("id");
  const formSchema = z.object({
    title: z.string().min(5, {
      message: " must be of 5 charecter ",
    }),
    code: z.string().min(5, {
      message: "must be of 5 charecter ",
    }),
    validityDays: z.string(),
    expireDate: z.string().min(10, {
      message: " must be of 10 charecter ",
    }),
    productId: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: singleData?.title,
      code: singleData?.code,
      expireDate: moment(singleData?.expireDate).format("YYYY-MM-DD"),
      productId: singleData?.product?.id.toString(),
      validityDays: singleData?.validityDays.toString(),
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateLicense,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutateAsync({
      id: +id,
      values: {
        title: values?.title,
        code: values?.code,
        expireDate: values?.expireDate,
        productId: +values?.productId,
        validityDays: +values?.validityDays,
      },
    }).then(() => {
      toast.success("License created successfully");
      router.push("/admin/license");
      client.invalidateQueries({ queryKey: ["get-all-licenses"] });
    });
  };

  const { data, isFetching, isLoading } = UseGetAllProducts();

  return (
    <div className="pt-10">
      <AdminHeader title="License" />
      <DeleteLicenseButton id={id} />
      <div>
        <Card className="mx-10">
          <CardHeader></CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-[#d3d3d1]"
                            placeholder="Enter the title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  name="productId"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Order</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="">
                            <SelectValue
                              placeholder={`${singleData.product.id}-${singleData?.product.title}}`}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {!isLoading &&
                              !isFetching &&
                              data?.map((item: any) => (
                                <SelectItem
                                  value={item?.id?.toString()}
                                  key={item.id}
                                >
                                  {item?.id} - {item?.title}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  name="code"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Code</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-[#d3d3d1]"
                            placeholder="Enter the code"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  name="expireDate"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>ExpireDate</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            defaultValue={moment(singleData?.expireDate).format(
                              "YYYY-MM-DD"
                            )}
                            className="border border-[#d3d3d1]"
                            placeholder="Enter the ExpireDate"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  name="validityDays"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Validity Days</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="border border-[#d3d3d1]"
                            placeholder="Enter the validityDays"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full mt-4"
                >
                  Save
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditLicenseForm;
