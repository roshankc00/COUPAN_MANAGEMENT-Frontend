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
import { UseGetAllStore } from "@/hooks/react-query/stores/get_all_store_hook";
import { UseGetAllSubCategory } from "@/hooks/react-query/sub-categories/get_all_sub-categories.hook";
import { ISubcategory } from "@/interfaces/Subcategory.interface";
import { IStore } from "@/interfaces/Store.interface";
import { ICoupon } from "@/interfaces/coupon.interface";
import moment from "moment";
import { updateCoupon } from "@/common/api/coupons/coupons.api";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/components/Provider";
import DeleteCouponButton from "../../../_component/Edit-Delete.button";

type Props = {
  singleData: ICoupon;
  id: number;
};

function EditCouponForm({ singleData, id }: Props) {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const router = useRouter();
  const formSchema = z.object({
    title: z.string().min(3, {
      message: "must be of 8 charecter ",
    }),
    description: z.string().min(10, {
      message: " must be of 10 charecter ",
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

    featured: z.string(),
    categoryId: z.number(),
    subCategoryId: z.number(),
    storeId: z.number(),
    verified: z.string(),
    exclusive: z.string(),
    seo: z.object({
      title: z.string().min(3, {
        message: "must be of 3 charecter ",
      }),
      description: z.string().min(10, {
        message: "must be of 10 charecter ",
      }),
    }),
    status: z.string(),
    image: z.instanceof(File).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: singleData?.title,
      description: singleData?.description,
      tagLine: singleData?.tagLine,
      code: singleData?.code,
      startDate: moment(singleData?.startDate).format("YYYY-MM-DD"),
      expireDate: moment(singleData?.expireDate).format("YYYY-MM-DD"),
      featured: singleData?.featured?.toString(),
      categoryId: singleData?.categoryId,
      subCategoryId: singleData?.subCategoryId,
      storeId: singleData?.storeId,
      verified: singleData?.verified?.toString(),
      exclusive: singleData?.exclusive?.toString(),
      seo: {
        description: singleData?.seo?.description,
        title: singleData?.seo?.title,
      },
      status: singleData?.status,
      image: new File([""], "filename"),
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateCoupon,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!preview && !values?.image) {
      mutateAsync({ id, values } as any)
        .then(() => {
          toast.success("Coupon updated successfully");
          router.push("/admin/coupon");
          client.invalidateQueries({ queryKey: ["coupons"] });
        })
        .catch(() => {
          toast.error("Unable to update Coupon");
        });
    } else {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("tagLine", values.tagLine);
      formData.append("code", values.code);
      formData.append("startDate", values.startDate);
      formData.append("expireDate", values.expireDate);
      formData.append("featured", values.featured);
      formData.append("categoryId", values.categoryId.toString());
      formData.append("subCategoryId", values.subCategoryId.toString());
      formData.append("storeId", values.storeId.toString());
      formData.append("exclusive", values.exclusive);
      formData.append("verified", values.verified);
      if (values.image) {
        formData.append("image", values.image);
      }
      formData.append("seo[title]", values.seo.title);
      formData.append("seo[description]", values.seo.description);
      formData.append("status", values.status);
      mutateAsync({ id, values: formData } as any)
        .then(() => {
          toast.success("Coupon updated successfully");
          router.push("/admin/coupon");
          client.invalidateQueries({ queryKey: ["coupons"] });
        })
        .catch(() => {
          toast.error("Unable to update Coupon");
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

  const { data: allCat, isLoading: catLoading } = UseGetAllCategory();
  const { data: allSubCat, isLoading: subCatLoading } = UseGetAllSubCategory();
  const { data: allstore, isLoading: storeLoading } = UseGetAllStore();

  return (
    <div className="pt-10 pb-32">
      <AdminHeader title="Edit-Coupon" />
      <DeleteCouponButton id={id} />
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
                    name="tagLine"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem className="mb-3">
                          <FormLabel>Tagline</FormLabel>
                          <FormControl>
                            <Input
                              className="border border-[#d3d3d1]"
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
                        <FormItem className="mb-3">
                          <FormLabel>Code</FormLabel>
                          <FormControl>
                            <Input
                              className="border border-[#d3d3d1]"
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
                    name="startDate"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem className="mb-3">
                          <FormLabel>StartDate</FormLabel>
                          <FormControl>
                            <Input
                              defaultValue={moment(
                                singleData?.startDate
                              ).format("YYYY-MM-DD")}
                              type="date"
                              className="border border-[#d3d3d1]"
                              placeholder="Enter the startDate"
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
                        <FormItem className="mb-3">
                          <FormLabel>ExpireDate</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              defaultValue={moment(
                                singleData?.expireDate
                              ).format("YYYY-MM-DD")}
                              className="border border-[#d3d3d1]"
                              placeholder="Enter the ExpireDate"
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
                    name="exclusive"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem className="mb-3">
                          <FormLabel className="">Exclusive</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field?.value?.toString()}
                            >
                              <SelectTrigger className="">
                                <SelectValue
                                  placeholder={`${singleData?.exclusive}`}
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
                    name="verified"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem className="mb-3">
                          <FormLabel className="">Verified</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field?.value?.toString()}
                            >
                              <SelectTrigger className="">
                                <SelectValue
                                  placeholder={`${singleData?.verified}`}
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
                    name="categoryId"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem className="mb-3">
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="">
                              <SelectValue
                                placeholder={`${singleData?.category?.title}`}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {!catLoading &&
                                allCat?.map((item: ICategory) => (
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
                    name="storeId"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem className="mb-3">
                          <FormLabel>Store</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="">
                              <SelectValue
                                placeholder={`${singleData?.store?.title}`}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {!storeLoading &&
                                allstore?.map((item: IStore) => (
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
                    name="subCategoryId"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem className="mb-3">
                          <FormLabel>SubCategory</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="">
                              <SelectValue
                                placeholder={`${singleData?.subCategory?.title}`}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {!subCatLoading &&
                                allSubCat?.map((item: ISubcategory) => (
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

export default EditCouponForm;
