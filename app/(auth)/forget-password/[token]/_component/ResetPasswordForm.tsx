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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { resetPassword } from "@/common/api/users/user.api";

function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const formSchema = z.object({
    newPassword: z.string().min(8, {
      message: "Password must be of 8 charecter ",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be of 8 charecter ",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: resetPassword,
    onSuccess(data, variables, context) {
      toast.success("Check Your Mail please");
      router.push("/login");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.newPassword === values.confirmPassword) {
      mutate({ newPassword: values.newPassword, token: token });
    } else {
      toast.error("newPassword and confirmPassword dont match");
    }
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
                  name="newPassword"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel> New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel> Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
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

export default ResetPasswordForm;
