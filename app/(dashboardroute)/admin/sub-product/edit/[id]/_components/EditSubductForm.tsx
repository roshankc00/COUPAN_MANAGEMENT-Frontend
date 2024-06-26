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
import { useRouter } from "next/navigation";
import { client } from "@/components/Provider";
import { Button } from "@/components/ui/button";
import { postProduct } from "@/common/api/products/products.api";
import { UseGetAllProducts } from "@/hooks/react-query/products/get-all-products";
import AdminHeader from "@/app/(dashboardroute)/admin/_component/Header";
import DeleteProductButton from "../../../_component/Edit-Delete.button";
type Props = {
  id: number;
  singleData: any;
};
const EditSubProductForm: React.FC<Props> = ({ id, singleData }) => {
  const router = useRouter();
  const formSchema = z.object({
    title: z.string().min(5, {
      message: " must be of 5 charecter ",
    }),
    description: z.string().min(5, {
      message: "must be of 5 charecter ",
    }),
    price: z.string(),
    productId: z.string(),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: postProduct,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: singleData?.title,
      description: singleData?.description,
      productId: singleData?.product?.id,
      price: singleData?.price,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutateAsync({
      ...values,
      price: +values?.price,
    }).then(() => {
      toast.success("Product created successfully");
      router.push("/admin/products");
      client.invalidateQueries({ queryKey: ["get-all-products"] });
      client.invalidateQueries({ queryKey: ["get-all-products-with-type"] });
    });
  };
  const { data, isFetching, isLoading } = UseGetAllProducts();
  return (
    <div className="pt-10">
      <AdminHeader title="Edit-SubProduct" />
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
                  name="price"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-[#d3d3d1]"
                            placeholder="Enter the Price"
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
                        <FormLabel>Product</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="">
                            <SelectValue
                              placeholder={`${
                                singleData?.product
                                  ? `${singleData?.title}`
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
                                  {item?.title}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <div className="w-full flex justify-end">
                  <Button
                    type="submit"
                    className="w-[200px] mt-4"
                    disabled={isPending}
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

export default EditSubProductForm;
