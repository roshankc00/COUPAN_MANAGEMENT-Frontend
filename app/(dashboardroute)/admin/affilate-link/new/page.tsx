"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import AdminHeader from "../../_component/Header";
import { postAffilateLink } from "@/common/api/affilate-link/affilate-link.api";
import { useMutation } from "@tanstack/react-query";
import { UseGetAllStore } from "@/hooks/react-query/stores/get_all_store_hook";
import { IStore } from "@/interfaces/Store.interface";
import { client } from "@/components/Provider";

function NewSubCategoryForm() {
  const router = useRouter();
  const formSchema = z.object({
    link: z.string().min(3, {
      message: " must be of 3 charecter ",
    }),
    tagLine: z.string().min(3, {
      message: " must be of 3 charecter ",
    }),
    merchant: z.string().min(3, {
      message: " must be of 3 charecter ",
    }),
    apiKey: z
      .string()
      .min(3, {
        message: " must be of 3 charecter ",
      })
      .optional(),
    apiLink: z
      .string()
      .min(3, {
        message: " must be of 3 charecter ",
      })
      .optional(),

    storeId: z.string(),
    cashbackAmountPer: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: "",
      merchant: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: postAffilateLink,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.apiKey && values.apiLink) {
      mutateAsync({
        ...values,
        storeId: +values.storeId,
        cashbackAmountPer: +values.cashbackAmountPer,
      }).then(() => {
        router.push("/admin/affilate-link");
        client.invalidateQueries({ queryKey: ["affilateLink"] });
        toast.success("Affilate link created successfully");
      });
    } else {
      mutateAsync({
        link: values.link,
        tagLine: values.tagLine,
        cashbackAmountPer: +values.cashbackAmountPer,
        storeId: +values.storeId,
        merchant: values.merchant,
      }).then(() => {
        client.invalidateQueries({ queryKey: ["affilateLink"] });
        toast.success("Affilate link created successfully");
      });
    }
  };

  const { data: allstore, isLoading: storeLoading } = UseGetAllStore();

  return (
    <div className="mt-10">
      <AdminHeader title="New-AffilateLink" />
      <div>
        <Card className=" ms-24">
          <CardHeader></CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="link"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Link</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-[#d3d3d1]"
                            placeholder="Enter the Link"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  name="tagLine"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Mechat</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-[#d3d3d1]"
                            placeholder="Enter the merchat"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <FormField
                  name="cashbackAmountPer"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>cashback Amount Percentage</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="border border-[#d3d3d1]"
                            placeholder="Enter the ashback Amount Percentage"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  name="storeId"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Store</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Select the Store" />
                          </SelectTrigger>
                          <SelectContent>
                            {!storeLoading &&
                              allstore?.map((item: IStore) => (
                                <SelectItem
                                  value={item?.id?.toString()}
                                  key={item.id}
                                >
                                  {item.title}
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
                  name="merchant"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Mechat</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-[#d3d3d1]"
                            placeholder="Enter the merchat"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  name="apiLink"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Api Link</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-[#d3d3d1]"
                            placeholder="Enter the api Link"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  name="apiKey"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Api Key</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-[#d3d3d1]"
                            placeholder="Enter the Api key"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <Button type="submit" disabled={isPending}>
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default NewSubCategoryForm;
