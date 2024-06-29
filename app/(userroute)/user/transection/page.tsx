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
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { postFaqs } from "@/common/api/faqs/faqs.api";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { client } from "@/components/Provider";
import { Button } from "@/components/ui/button";
import { addTransectionId } from "@/common/api/orders/orders.api";
const AddTransectionPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const router = useRouter();
  const formSchema = z.object({
    transectionId: z.string().min(5, {
      message: " must be of 5 charecter ",
    }),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addTransectionId,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transectionId: "",
    },
  });
  //   postFaqs

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!orderId) {
      toast.error("Please place order first");
    } else {
      mutateAsync({
        orderId: +orderId,
        transectionId: values.transectionId,
      }).then(() => {
        toast.success("Transection Id added Successfully");
        router.push("/user/order-success");
      });
    }
  };
  return (
    <div className="mt-10 flex justify-center">
      <div>
        <Card className="w-[500px]  mt-5">
          <CardHeader className="text-center text-xl font-semibold">
            Verify Payment
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="transectionId"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>TransectionId</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-[#d3d3d1]"
                            placeholder="Enter the TransectionId"
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

export default AddTransectionPage;
