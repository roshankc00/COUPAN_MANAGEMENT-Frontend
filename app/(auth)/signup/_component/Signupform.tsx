"use client";
import React from "react";
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
import { handleLogin, signupUser } from "@/common/api/users/user.api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import { redirect, useRouter } from "next/navigation";

function SignupForm() {
  const { isLogedInStatus } = useSelector((state: IRootState) => state.auth);
  const router = useRouter();
  if (isLogedInStatus) {
    window.location.href = "/";
  }
  const formSchema = z.object({
    name: z.string().min(3, {
      message: "Name must be of 3 charecter ",
    }),
    email: z
      .string()
      .min(1, {
        message: "Email field is required",
      })
      .email(),
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
    mutationFn: signupUser,
    onSuccess() {
      toast.success("Check your Mail Please");
      router.push("/login");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Create New Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter the name"
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
                Submit
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
                Sign up With Google
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Link href="/login" className="text-center text-sky-400 w-full">
            Already have an Accoun?Login
          </Link>
          <p></p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignupForm;
