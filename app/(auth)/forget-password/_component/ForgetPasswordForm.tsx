"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { forgetPassword, loginUser } from "@/common/api/users/user.api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useUserStore from "@/store";

function ForgetPasswordForm() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const formSchema = z.object({
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: forgetPassword,
    onSuccess(data, variables, context) {
      toast.success("Check Your Mail please");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    mutate(values.email);
  };

  return (
    <div className="flex justify-center mt-[10%]">
      <div className="w-[500px]">
        <Card className="py-4">
          <CardHeader>
            <CardTitle className="text-center">Forget Password</CardTitle>
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
                <Button type="submit" className="w-full">
                  Reset Password
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ForgetPasswordForm;
