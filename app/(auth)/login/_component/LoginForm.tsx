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
import { loginUser } from "@/common/api/user/user.api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useUserStore from "@/store";

function LoginForm() {
  const router = useRouter();
  const userLoginStatus = useUserStore((state) => state.isLoggedInStatus);
  if (userLoginStatus) {
    router.push("/");
  }
  const setUser = useUserStore((state) => state.setUser);
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be of 8 charecter ",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess(data, variables, context) {
      toast.success("User LoggedIn successfully");
      setUser(data?.user);
      router.push("/");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <div>
      <Card className="py-4">
        <CardHeader>
          <CardTitle className="text-center">Login User</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="shadcn"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="flex justify-center w-full">
            <Link href="/signup" className="text-center text-sky-600">
              Not Registered ? Create an account
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginForm;
