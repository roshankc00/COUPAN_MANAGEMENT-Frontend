"use client";
import React, { useEffect, useState } from "react";
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
import { useDropzone } from "react-dropzone";
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
import { useMutation } from "@tanstack/react-query";
import { updateCategory } from "@/common/api/categories/category.api";
import { client } from "@/components/Provider";
import DeleteCategoryButton from "../../../_component/Edit-Delete.button";

type Props = {
  singleData: ICategory;
  id: number;
};

function EditCategoryForm({ id, singleData }: Props) {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const router = useRouter();
  const formSchema = z.object({
    title: z.string().min(3, {
      message: " must be of 3 charecter ",
    }),
    description: z.string().min(10, {
      message: "must be of 10 charecter ",
    }),
    showInMenu: z.string(),
    featured: z.string(),
    seo: z.object({
      title: z.string().min(3, {
        message: " must be of 3 charecter ",
      }),
      description: z.string().min(10, {
        message: " must be of 10 charecter ",
      }),
    }),
    image: z.instanceof(File).optional(),
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
      showInMenu: singleData?.showInMenu?.toString(),
      featured: singleData?.featured?.toString(),
      status: singleData?.status,
      image: new File([""], "filename"),
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateCategory,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!preview) {
      mutateAsync({ id, values } as any)
        .then(() => {
          toast.success("Category updated successfully");
          router.push("/admin/category");
          client.invalidateQueries({ queryKey: ["category"] });
          client.invalidateQueries({
            queryKey: ["sub-categories-by-category"],
          });
        })
        .catch(() => {
          toast.error("Unable to update Category");
        });
    } else {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("status", values.status);
      formData.append("showInMenu", values.showInMenu);
      formData.append("featured", values.featured);
      if (values.image) {
        formData.append("image", values.image);
      }
      formData.append("seo[title]", values.seo.title);
      formData.append("seo[description]", values.seo.description);
      mutateAsync({ id, values: formData } as any)
        .then(() => {
          toast.success("Category updated successfully");
          router.push("/category");
          client.invalidateQueries({ queryKey: ["category"] });
          client.invalidateQueries({
            queryKey: ["sub-categories-by-category"],
          });
        })
        .catch(() => {
          toast.error("Unable to updated category");
        });
    }
  };

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        form.setValue("image", acceptedFiles[0]);
        form.clearErrors("image");
      } catch (error) {
        setPreview(null);
        form.resetField("image");
      }
    },
    [form]
  );
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

  const { data, isFetching, isLoading } = UseGetAllCategory();
  return (
    <div className="pt-10">
      <AdminHeader title="Edit-Category" />
      <DeleteCategoryButton id={id} />
      <div>
        <Card className="mx-10">
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
                    name="showInMenu"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem className="mb-3">
                          <FormLabel className="">ShowInMenu</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field?.value?.toString()}
                            >
                              <SelectTrigger className="">
                                <SelectValue
                                  placeholder={`${singleData?.showInMenu}`}
                                />
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
                    name="featured"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem className="mb-3">
                          <FormLabel className="">Featured</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field?.value?.toString()}
                            >
                              <SelectTrigger className="">
                                <SelectValue
                                  placeholder={`${singleData?.featured}`}
                                />
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
                    control={form.control}
                    name="image"
                    render={() => (
                      <FormItem className=" mb-4">
                        <FormLabel
                          className={`${
                            fileRejections.length !== 0 && "text-destructive"
                          }`}
                        >
                          Select File
                        </FormLabel>
                        <FormControl>
                          <div
                            {...getRootProps()}
                            className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 border rounded-lg  p-8 shadow-sm shadow-foreground"
                          >
                            {preview ? (
                              <img
                                src={preview as string}
                                alt="Uploaded image"
                                className="max-h-[400px] rounded-lg"
                              />
                            ) : (
                              <img
                                src={`${singleData?.imageUrl}`}
                                alt="Uploaded image"
                                className="max-h-[400px] rounded-lg"
                              />
                            )}
                            <Input
                              {...getInputProps()}
                              type="file"
                              className="border-none"
                            />
                            {isDragActive ? (
                              <p>Drop the image!</p>
                            ) : (
                              <p className="text-gray-500">
                                Click here or drag an image to upload it
                              </p>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage>
                          {fileRejections.length !== 0 && (
                            <p>
                              Image must be less than 1MB and of type png, jpg,
                              or jpeg
                            </p>
                          )}
                        </FormMessage>
                      </FormItem>
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
                              defaultValue={field?.value?.toString()}
                            >
                              <SelectTrigger className="">
                                <SelectValue
                                  placeholder={`${singleData?.status}`}
                                />
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
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full mt-4"
                  >
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

export default EditCategoryForm;
