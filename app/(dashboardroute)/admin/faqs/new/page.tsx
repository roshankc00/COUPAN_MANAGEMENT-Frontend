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
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { postFaqs } from "@/common/api/faqs/faqs.api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { client } from "@/components/Provider";
import { Button } from "@/components/ui/button";
const AddFaqs = () => {
  const router = useRouter();
  const formSchema = z.object({
    question: z.string().min(5, {
      message: " must be of 5 charecter ",
    }),
    answer: z.string().min(5, {
      message: "must be of 5 charecter ",
    }),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: postFaqs,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      answer: "",
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
  return (
    <div className="mt-10">
      <AdminHeader title="Faqs" />
      <div>
        <Card className=" ms-24">
          <CardHeader></CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="question"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Question</FormLabel>
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
                  name="answer"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Answer</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-[#d3d3d1]"
                            placeholder="Enter the answer"
                            {...field}
                          />
                        </FormControl>
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
