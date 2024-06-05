"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState } from "react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import { postOffer } from "@/common/api/offer/offer.api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SubmitOffer = () => {
  const router = useRouter();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const [route, setroute] = useState("Coupon");
  const formSchema = z.object({
    code:
      route === "Coupon"
        ? z.string().min(3, { message: " must be at least 3 characters long" })
        : z.string().optional(),
    url: z.string().min(3, {
      message: "must be of atleast 3 charecter ",
    }),
    tagLine: z
      .string()
      .min(3, { message: " must be at least 3 characters long" }),
    startDate: z
      .string()
      .min(3, { message: " must be at least 3 characters long" }),
    expireDate: z
      .string()
      .min(3, { message: " must be at least 3 characters long" }),
    status: z
      .string()
      .min(3, { message: " must be at least 3 characters long" }),
    image: z.instanceof(File).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      tagLine: "",
      status: "enabled",
      image: new File([""], "filename"),
    },
  });

  const ROUTE = ["Coupon", "Deal"] as const;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: postOffer,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (preview && values?.image) {
      const formData = new FormData();
      if (route === "Coupon") {
        formData.append("code", values.code!);
        formData.append("isDeal", "false");
      } else {
        formData.append("isDeal", "true");
      }
      if (preview && values?.image) {
        formData.append("image", values.image);
      }
      formData.append("tagLine", values.tagLine);
      formData.append("startDate", values.startDate);
      formData.append("expireDate", values.expireDate);
      formData.append("url", values.url);
      formData.append("status", values.status);
      mutateAsync(formData as any)
        .then(() => {
          toast.success("Offer Send successfully");
          router.push("/");
        })
        .catch(() => {
          toast.error("Unable to Send Offer");
        });
    } else {
      const isDeal = route === "Deal";
      mutateAsync({
        ...values,
        isDeal,
        code: isDeal ? null : values.code,
      } as any)
        .then(() => {
          toast.success("Offer Send successfully");
          router.push("/");
        })
        .catch(() => {
          toast.error("Unable to Send Offer");
        });
    }
  };

  const onDrop = useCallback(
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
  return (
    <div className="ms-24">
      <div className="my-10">
        {/* navigation  */}
        {ROUTE?.map((item) => (
          <button
            key={item}
            className={` p-2 rounded-md shadow-sm  w-[200px] border ${
              route === item ? "bg-black text-white" : "bg-white text-black"
            }`}
            onClick={() => setroute(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div>
        <Card className="mb-10">
          <CardHeader></CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" grid grid-cols-1  2xl:grid-cols-1  gap-0 2xl:gap-1"
              >
                <div className="col-span-3 bg-white  shadow-sm rounded-md">
                  {route === "Coupon" && (
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
                  )}
                  <FormField
                    name="url"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem className="mb-3">
                          <FormLabel>Offer URL or Store Homepage URL</FormLabel>
                          <FormControl>
                            <Input
                              className="border border-[#d3d3d1]"
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
                    name="tagLine"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem className="mb-3">
                          <FormLabel>tagLine</FormLabel>
                          <FormControl>
                            <Input
                              className="border border-[#d3d3d1]"
                              placeholder="Enter the tagLine"
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
                            className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 border border-dashed rounded-lg p-8 shadow-sm shadow-foreground"
                          >
                            {preview && (
                              <img
                                src={preview as string}
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
};

export default SubmitOffer;
