"use client";
import React from "react";
import AdminHeader from "../../_component/Header";
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
import { postLicense } from "@/common/api/license/license.api";
import { UseGetAllProducts } from "@/hooks/react-query/products/get-all-products";
import { UseGetAllSubProducts } from "@/hooks/react-query/sub-products/get-all-subproducts";
const AddFaqs = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const paramsSubproductId = searchParams.get("subproductId");
  const tagLine = searchParams.get("tagLine");
  const router = useRouter();
  const formSchema = z.object({
    title: z.string().min(5, {
      message: " must be of 5 charecter ",
    }),
    code: z.string().min(5, {
      message: "must be of 5 charecter ",
    }),
    validityDays: z.string().optional(),
    expireDate: z.string().optional(),
    subProductId: z.string(),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: postLicense,
    onSuccess(data, variables, context) {
      client.invalidateQueries({ queryKey: ["get-all-licenses"] });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      code: "",
      expireDate: "",
      subProductId: paramsSubproductId ? paramsSubproductId : undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.validityDays && values.expireDate) {
      mutateAsync({
        title: values.title,
        code: values.code,
        validityDays: +values.validityDays,
        expireDate: values.expireDate,
        subProductId: +values.subProductId,
      }).then(() => {
        toast.success("License updated successfully");
        if (orderId) {
          router.push(`/admin/orders/${+orderId}`);
        } else {
          router.push("/admin/license");
        }
      });
    } else {
      if (!values.validityDays && !values.expireDate) {
        mutateAsync({
          title: values.title,
          code: values.code,
          subProductId: +values.subProductId,
        }).then(() => {
          toast.success("License updated successfully");
          if (orderId) {
            router.push(`/admin/orders/${+orderId}`);
          } else {
            router.push("/admin/license");
          }
        });
      } else {
        toast.error("Provide both validityDays and expireDate ");
      }
    }
  };

  const { data, isFetching, isLoading } = UseGetAllProducts();
  console.log(data, "wowo");
  return (
    <div className="pt-10">
      <AdminHeader title="License" />
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
                  name="subProductId"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Product</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="">
                            <SelectValue
                              placeholder={`${
                                paramsSubproductId
                                  ? tagLine
                                  : "Select the Product"
                              }`}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {!isLoading &&
                              data?.map((item: any) => (
                                <SelectItem
                                  value={item?.id?.toString()}
                                  key={item.id}
                                >
                                  {item?.product?.title} - ({item?.title})
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

export default AddFaqs;
