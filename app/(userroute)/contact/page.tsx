"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { postFeedback } from "@/common/api/feedback/feedback.api";

const formSchema = z.object({
  name: z.string().min(3, { message: " must be at least 3 characters long" }),
  email: z.string().min(3, { message: " must be at least 3 characters long" }),
  companyUrl: z.string().optional(),
  message: z
    .string()
    .min(3, { message: " must be at least 3 characters long" }),
});
const SubmitOffer = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: postFeedback,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutateAsync(values)
      .then(() => {
        toast.success("Feedback Sent successfully");
        router.push("/");
      })
      .catch(() => {
        toast.error("Unable to Send Feedback");
      });
  };

  return (
    <div className="ms-2 mt-5">
      <div>
        <Card className="mb-10">
          <div className="my-5 px-5">
            <h1 className="text-blue-700 text-2xl md:text-4xl font-bold my-3 ">
              Contact Us
            </h1>
            <p className="text-gray-600 md:text-xl text-sm">
              Visit our Help Center to find answers quickly or get in touch with
              our support team by filling this form:
            </p>
          </div>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" grid grid-cols-1  2xl:grid-cols-1  gap-0 2xl:gap-1"
              >
                <div className="col-span-3 bg-white  shadow-sm rounded-md">
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem className="mb-5">
                          <FormLabel>Full Name (required) </FormLabel>
                          <FormControl>
                            <Input
                              className="border border-[#d3d3d1]"
                              placeholder="Enter the Full Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem className="mb-5">
                          <FormLabel>Email Address (required)</FormLabel>
                          <FormControl>
                            <Input
                              className="border border-[#d3d3d1]"
                              placeholder="Enter the Email address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    name="companyUrl"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem className="mb-5">
                          <FormLabel>Company Website</FormLabel>
                          <FormControl>
                            <Input
                              className="border border-[#d3d3d1]"
                              placeholder="Enter the Company Url"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    name="message"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem className="mb-5">
                          <FormLabel>
                            What can we help you with? (required)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              className="border border-[#d3d3d1]"
                              placeholder="Enter the Message"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-[200px] mt-4 p-2 px-2 border border-blue-600 rounded-md"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubmitOffer;
