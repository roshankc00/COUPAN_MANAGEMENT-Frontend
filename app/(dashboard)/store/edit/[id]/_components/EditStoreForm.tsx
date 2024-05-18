"use client";
import React, { useEffect, useState } from "react";
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
import { ImagePlus } from "lucide-react";
import AdminHeader from "@/app/(dashboard)/_component/Header";
import { IStore } from "@/interfaces/Store.interface";
import { updateStore } from "@/common/api/stores/store.api";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/components/Provider";

type Props = {
  singleData: IStore;
  id: number;
};

function EditStoreForm({ singleData, id }: Props) {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");

  const router = useRouter();
  const formSchema = z.object({
    title: z.string().min(3, {
      message: " must be of 3 charecter ",
    }),
    description: z.string().min(10, {
      message: "must be of 10 charecter ",
    }),
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
    // .refine((file) => file?.size !== 0, "Please upload an image"),
    status: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: singleData?.title,
      description: singleData?.description,
      featured: singleData?.featured?.toString(),
      seo: {
        description: singleData?.seo?.description,
        title: singleData?.seo?.title,
      },
      status: singleData?.status,
      image: new File([""], "filename"),
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: updateStore,
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!preview && !values.image) {
      mutateAsync({ id, values } as any)
        .then(() => {
          toast.success("Store created successfully");
          router.push("/store");
          client.invalidateQueries({ queryKey: ["store"] });
        })
        .catch(() => {
          toast.error("Unable to create Store");
        });
    } else {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("status", values.status);
      formData.append("featured", values.featured);
      if (values?.image) {
        formData.append("image", values.image);
      }
      formData.append("seo[title]", values.seo.title);
      formData.append("seo[description]", values.seo.description);
      mutateAsync({ id, values: formData } as any)
        .then(() => {
          toast.success("Store created successfully");
          router.push("/store");
          client.invalidateQueries({ queryKey: ["store"] });
        })
        .catch(() => {
          toast.error("Unable to create Store");
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
    <div className="mt-10">
      <AdminHeader title="New-Category" />
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
                                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${singleData?.imageName}`}
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
                              defaultValue={field.value.toString()}
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

export default EditStoreForm;
