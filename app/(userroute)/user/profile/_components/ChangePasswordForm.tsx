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
import { UseChangeUserPassword } from "@/hooks/react-query/users/changeUserPassword";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";

function ChangePassword() {
  const { email } = useSelector((state: IRootState) => state.auth);
  const changePassword = UseChangeUserPassword();
  const router = useRouter();
  const formSchema = z.object({
    oldPassword: z.string().min(8, {
      message: "Password must be of 8 charecter ",
    }),
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
      oldPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.newPassword === values.confirmPassword) {
      changePassword({
        email,
        newPassword: values.newPassword,
        oldPassword: values.oldPassword,
      });
    } else {
      toast.error("newPassword and confirmPassword dont match");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full">
        <h1 className="my-4 text-xl font-bold text-center">Change Password</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel> Old Password</FormLabel>
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
            <Button type="submit" disabled={false} className="w-full">
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ChangePassword;
