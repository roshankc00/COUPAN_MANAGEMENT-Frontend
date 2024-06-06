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
    orderId: z.string(),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateLicense,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: singleData?.title,
      code: singleData?.code,
      orderId: singleData?.orderId,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutateAsync({
      id: +id,
      values: {
        title: values.orderId,
        code: values.code,
        orderId: +values.orderId,
      },
    }).then(() => {
      toast.success("License created successfully");
      router.push("/admin/license");
      client.invalidateQueries({ queryKey: ["get-all-licenses"] });
    });
  };

  const { data: allOrders, isLoading: orderLoading } =
    UseGetAllOrderWithStatus("pending");

  return (
    <div className="mt-10">
      <AdminHeader title="License" />
      <div>
        <Card className=" ms-24">
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
                  name="orderId"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Order</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="">
                            <SelectValue
                              placeholder={`${
                                paramid
                                  ? `OrderId-${singleData?.id}`
                                  : "Select the orderId"
                              }`}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {!orderLoading &&
                              allOrders?.map((item: any) => (
                                <SelectItem
                                  value={item?.id?.toString()}
                                  key={item.id}
                                >
                                  {item?.id} - {item?.email}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
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
