"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import AdminHeader from "../../../../_component/Header";
import { ISubcategory } from "@/interfaces/Subcategory.interface";
import { useMutation } from "@tanstack/react-query";
import { updateSubCategory } from "@/common/api/sub-categories/sub-category.api";
import { client } from "@/components/Provider";

type Props = {
  singleData: ISubcategory;
  id: number;
};

function EditSubCategoryForm({ id, singleData }: Props) {
  const router = useRouter();
  const formSchema = z.object({
    title: z.string().min(3, {
      message: " must be of 3 charecter ",
    }),
    description: z.string().min(10, {
      message: "must be of 10 charecter ",
    }),
    categoryId: z.number(),
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
      title: singleData?.title,
      description: singleData?.description,
      seo: {
        description: singleData?.seo?.description,
        title: singleData?.seo?.title,
      },
      status: singleData?.status,
      categoryId: singleData?.category?.id,
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: updateSubCategory,
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutateAsync({ id, values })
      .then(() => {
        toast.success("sub-categories updated successfully");
        router.push("/sub-category");
        client.invalidateQueries({ queryKey: ["sub-categories"] });
        client.invalidateQueries({ queryKey: ["sub-categories-by-category"] });
      })
      .catch(() => {
        toast.error("Unable to update sub-categories");
      });
  };

  const { data, isFetching, isLoading } = UseGetAllCategory();

  return (
    <div className="mt-10">
      <AdminHeader title="Edit-Subcategory" />
      <div>
        <Card className=" ms-24">
          <CardHeader></CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" grid grid-cols-1  2xl:grid-cols-4   gap-0 2xl:gap-5"
              >
                <div className="col-span-3 bg-white  shadow-sm rounded-md">
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
                    name="categoryId"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem className="mb-3">
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field?.value?.toString()}
                          >
                            <SelectTrigger className="">
                              <SelectValue
                                placeholder={`${singleData.category.title}`}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {!isLoading &&
                                !isFetching &&
                                data?.map((item: ICategory) => (
                                  <SelectItem
                                    value={item?.id?.toString()}
                                    key={item.id}
                                  >
                                    {item.title}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
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
                </div>
                <div className="col-span-1 ">
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
                              defaultValue={field?.value?.toString()}
                            >
                              <SelectTrigger className="">
                                <SelectValue placeholder="Select the Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={"enabled"}>
                                  Enabled
                                </SelectItem>
                                <SelectItem value={"disabled"}>
                                  Disabled
                                </SelectItem>
                                <SelectItem value={"pending"}>
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
                  <Button type="submit" className="w-full mt-4">
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default EditSubCategoryForm;
