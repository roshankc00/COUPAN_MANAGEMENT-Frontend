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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseGetAllCategory } from "@/hooks/react-query/categories/get_all_category.hook";
import { ICategory } from "@/interfaces/category.interface";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useMutation } from "@tanstack/react-query";
import { postSubCategory } from "@/common/api/sub-categories/sub-category.api";
import { client } from "@/components/Provider";
import { PlusCircle } from "lucide-react";
type Props = {
  categoryId: number;
};

const AddSubCategoryForm: React.FC<Props> = ({ categoryId }) => {
  const router = useRouter();
  const formSchema = z.object({
    title: z.string().min(3, {
      message: " must be of 3 charecter ",
    }),
    description: z.string().min(10, {
      message: "must be of 10 charecter ",
    }),
    seo: z.object({
      title: z.string().min(3, {
        message: " must be of 3 charecter ",
      }),
      description: z.string().min(10, {
        message: " must be of 10 charecter ",
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
      status: "enabled",
    },
  });

  // data post related stups
  const { mutateAsync, isPending } = useMutation({
    mutationFn: postSubCategory,
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutateAsync({ ...values, categoryId: +categoryId })
      .then(() => {
        toast.success("sub-categories created successfully");
        router.push("/admin/sub-category");
        client.invalidateQueries({ queryKey: ["sub-categories"] });
        client.invalidateQueries({ queryKey: ["sub-categories-by-category"] });
      })
      .catch(() => {
        toast.error("Unable to create sub-categories");
      });
  };

  const { data, isFetching, isLoading } = UseGetAllCategory();
  return (
    <div className="ms-10">
      <div>
        <Sheet>
          <SheetTrigger>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add SubCategory
            </Button>
          </SheetTrigger>
          <SheetContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" grid grid-cols-1 "
              >
                <h1 className="mt-10 text-xl text-center my-5">
                  Add SubCategory
                </h1>
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-[#d3d3d1]"
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
                      <FormItem className="mb-3">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-[#d3d3d1]"
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
                  name="seo.title"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-[#d3d3d3]"
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
                      <FormItem className="mb-3">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-[#d3d3d1]"
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
                  name="status"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel className="">Status</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value.toString()}
                          >
                            <SelectTrigger className="">
                              <SelectValue placeholder="Select the Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={"enabled"}>Enabled</SelectItem>
                              <SelectItem value={"disabled"}>
                                Disabled
                              </SelectItem>
                              <SelectItem value={"pending"}>Pending</SelectItem>
                            </SelectContent>
                          </Select>
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
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default AddSubCategoryForm;
