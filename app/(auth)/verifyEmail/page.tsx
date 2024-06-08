"use client";
import React from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { ReSendEmailVerificationMail } from "@/common/api/users/user.api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const VerifyEmail = () => {
  const router = useRouter();
  const formSchema = z.object({
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ReSendEmailVerificationMail,
    onSuccess() {
      toast.success("Email verified successfully");
      router.push("/login");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({ email: values.email });
  };
  return (
    <div className="flex mt-[10%] w-full justify-center">
      <div className="w-[500px]">
        <Card className="py-4">
          <CardHeader>
            <CardTitle className="text-center">Verify Email</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter the email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <Button type="submit" disabled={isPending} className="w-full">
                  Verify Email
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmail;
