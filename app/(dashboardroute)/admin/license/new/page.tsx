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
import { useRouter } from "next/navigation";
import { client } from "@/components/Provider";
import { Button } from "@/components/ui/button";
import { UseGetAllOrderWithStatus } from "@/hooks/react-query/orders/get-all-orders-with-status";
const AddFaqs = () => {
  const router = useRouter();
  const formSchema = z.object({
    title: z.string().min(5, {
      message: " must be of 5 charecter ",
    }),
    code: z.string().min(5, {
      message: "must be of 5 charecter ",
    }),
    orderId: z.string(),
  });

  const { mutateAsync } = useMutation({
    mutationFn: postFaqs,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      code: "",
    },
  });
  //   postFaqs

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutateAsync(values).then(() => {
      toast.success("FAQ created successfully");
      router.push("/admin/faqs");
      client.invalidateQueries({ queryKey: ["faqs"] });
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
                            <SelectValue placeholder="Select the Order" />
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

                <Button type="submit" className="w-full mt-4">
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
