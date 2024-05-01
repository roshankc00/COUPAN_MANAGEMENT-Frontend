"use client";
import React from "react";
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
import { loginUser, signupUser } from "@/common/api/user/user.api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function SignupForm() {
  const router = useRouter();
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

  const { mutate } = useMutation({
    mutationFn: signupUser,
    onSuccess() {
      router.push("/login");
      toast.success("User Registered successfully");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
              <Button type="submit" className="w-full">
                Submit
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
