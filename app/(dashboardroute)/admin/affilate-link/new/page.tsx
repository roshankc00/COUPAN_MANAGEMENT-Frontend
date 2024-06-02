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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import AdminHeader from "../../_component/Header";
import { postAffilateLink } from "@/common/api/affilate-link/affilate-link.api";
import { useMutation } from "@tanstack/react-query";

function NewSubCategoryForm() {
  const router = useRouter();
  const formSchema = z.object({
    link: z.string().min(3, {
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
      console.log("mathi");
      mutateAsync({
        ...values,
      }).then(() => {
        toast.success("Affilate link created successfully");
      });
    } else {
      console.log("tala");
      mutateAsync({
        link: values.link,
        merchant: values.merchant,
      }).then(() => {
        toast.success("Affilate link created successfully");
      });
    }
  };

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
                <Button type="submit"> Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default NewSubCategoryForm;
