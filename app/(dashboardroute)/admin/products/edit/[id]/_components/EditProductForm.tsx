"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { useRouter } from "next/navigation";
import { client } from "@/components/Provider";
import { Button } from "@/components/ui/button";
import AdminHeader from "@/app/(dashboardroute)/admin/_component/Header";
import { editProduct } from "@/common/api/products/products.api";
import DeleteProductButton from "../../../_component/Edit-Delete.button";
type Props = {
  id: number;
  singleData: any;
};
const EditProductForm: React.FC<Props> = ({ id, singleData }) => {
  const router = useRouter();
  const formSchema = z.object({
    title: z.string().min(5, {
      message: " must be of 5 charecter ",
    }),
    description: z.string().min(5, {
      message: "must be of 5 charecter ",
    }),
    product_type: z.string().min(5, {
      message: "must be of 5 charecter ",
    }),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: editProduct,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: singleData?.title,
      description: singleData?.description,
      product_type: singleData?.product_type,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutateAsync({
      id: +id,
      values: {
        ...values,
      },
    }).then(() => {
      toast.success("Product updated successfully");
      router.push("/admin/products");
      client.invalidateQueries({ queryKey: ["get-all-products"] });
      client.invalidateQueries({ queryKey: ["get-all-products-with-type"] });
    });
  };
  return (
    <div className="pt-10">
      <AdminHeader title="Edit-Product" />
      <DeleteProductButton id={id} />
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
                            placeholder="Enter the question"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-[#d3d3d1]"
                            placeholder="Enter the description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <FormField
                  name="product_type"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel className="">Product Type</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field?.value?.toString()}
                          >
                            <SelectTrigger className="">
                              <SelectValue
                                placeholder={`${singleData?.product_type}`}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={"gift_card"}>
                                gift_card
                              </SelectItem>
                              <SelectItem value={"subscription"}>
                                subscription
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <div className="w-full flex justify-end">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-[200px] mt-4"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProductForm;
