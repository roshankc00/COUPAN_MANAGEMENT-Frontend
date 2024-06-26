"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import {
  handleLogin,
  loginUser,
  verifyEmail,
} from "@/common/api/users/user.api";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { getUserLoginStatus } from "@/common/api/api";
import { useDispatch } from "react-redux";
import { logedin } from "../../_redux/auth.slice";
function AlertLoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const queryToken = searchParams.get("token");

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

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess(data) {
      toast.success("User LoggedIn successfully");
      dispatch(logedin(data));
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  const verifyEmailHandler = async () => {
    if (queryToken) {
      await verifyEmail(queryToken);
    }
  };

  useEffect(() => {
    if (queryToken) {
      verifyEmailHandler();
    }
  }, []);

  return (
    <div className="w-full">
      <Card className="py-4 opacity-100 w-full border-none">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
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
              <Button type="submit" disabled={isPending} className="w-full">
                Login
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleLogin()}
                className="flex gap-5 items-center w-full "
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt=""
                />{" "}
                Login With Google
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col justify-center w-full">
            <Link
              href="/forget-password"
              className="text-center text-sky-600 block my-2"
            >
              Forget Password
            </Link>
            <Link href="/signup" className="text-center text-sky-600">
              Not Registered ? Create an account
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AlertLoginForm;
