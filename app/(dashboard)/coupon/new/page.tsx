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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function NewCouponForm() {
  const router = useRouter();
  const formSchema = z.object({
    title: z.string().min(3, {
      message: "Title must be of 8 charecter ",
    }),
    description: z.string().min(10, {
      message: "Description must be of 10 charecter ",
    }),
    tagLine: z.string().min(3, {
      message: " must be of 8 charecter ",
    }),
    code: z.string().min(10, {
      message: " must be of 10 charecter ",
    }),
    startDate: z.string().min(3, {
      message: " must be of 8 charecter ",
    }),
    expireDate: z.string().min(10, {
      message: " must be of 10 charecter ",
    }),
    url: z.string().min(10, {
      message: " must be of 10 charecter ",
    }),
    featured: z.string(),
    categoryId: z.number(),
    subCategoryId: z.number(),
    storeId: z.number(),
    verified: z.string(),
    exclusive: z.string(),
    seo: z.object({
      title: z.string().min(3, {
        message: "Seo Title must be of 3 charecter ",
      }),
      description: z.string().min(10, {
        message: "Seo Description must be of 10 charecter ",
      }),
    }),
    status: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      seo: {
        description: "",
        title: "",
      },
      code: "",
      url: "",
      tagLine: "",
      startDate: "",
      expireDate: "",
      status: "Enabled",
      exclusive: "false",
      verified: "false",
      featured: "false",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    alert(values);
    console.log(values);
  };

  return (
    <div>
      <div>
        <Card className=" ms-24">
          <CardHeader></CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 grid grid-cols-2 gap-5"
              >
                <div>
                  <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              className="border border-black"
                              placeholder="Enter the title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input
                              className="border border-black"
                              placeholder="Enter the description"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    name="tagLine"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>Tagline</FormLabel>
                          <FormControl>
                            <Input
                              className="border border-black"
                              placeholder="Enter the Tagline"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    name="code"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>Code</FormLabel>
                          <FormControl>
                            <Input
                              className="border border-black"
                              placeholder="Enter the Code"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    name="url"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>Url</FormLabel>
                          <FormControl>
                            <Input
                              className="border border-black"
                              placeholder="Enter the Url"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    name="startDate"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>StartDate</FormLabel>
                          <FormControl>
                            <Input
                              className="border border-black"
                              placeholder="Enter the Code"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    name="expireDate"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>ExpireDate</FormLabel>
                          <FormControl>
                            <Input
                              className="border border-black"
                              placeholder="Enter the Url"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <div className="flex justify-between mt-3">
                    <FormField
                      name="featured"
                      control={form.control}
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <FormLabel>Featured</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value.toString()}
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent className="border border-black">
                                  <SelectItem value={"true"}>Yes</SelectItem>
                                  <SelectItem value={"false"}>No</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />
                    <FormField
                      name="exclusive"
                      control={form.control}
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <FormLabel>Exclusive</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value.toString()}
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value={"true"}>Yes</SelectItem>
                                  <SelectItem value={"false"}>No</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />

                    <FormField
                      name="verified"
                      control={form.control}
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <FormLabel>Verified</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value.toString()}
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value={"true"}>Yes</SelectItem>
                                  <SelectItem value={"false"}>No</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />
                  </div>
                  <FormField
                    name="categoryId"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>categoryId</FormLabel>
                          <FormControl>
                            <Input
                              className="border border-black"
                              placeholder="Enter the Url"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    name="subCategoryId"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>subCategoryId</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className="border border-black"
                              placeholder="Enter the Code"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    name="storeId"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>storeId</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className="border border-black"
                              placeholder="Enter the Url"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                </div>
                <div>
                  <div className="border p-4">
                    <h1>SEO</h1>
                    <FormField
                      name="seo.title"
                      control={form.control}
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input
                                className="border border-black"
                                placeholder="Enter the title"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />
                    <FormField
                      name="seo.description"
                      control={form.control}
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input
                                className="border border-black"
                                placeholder="Enter the description"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />
                  </div>

                  <FormField
                    name="status"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>Featured</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value.toString()}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Theme" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={"Enabled"}>
                                  Enabled
                                </SelectItem>
                                <SelectItem value={"Disabled"}>
                                  Disabled
                                </SelectItem>
                                <SelectItem value={"Pending"}>
                                  Pending
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default NewCouponForm;
