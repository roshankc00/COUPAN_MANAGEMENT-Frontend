"use client";
import React, { useState } from "react";
import AdminHeader from "../../_component/Header";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { postFaqs } from "@/common/api/faqs/faqs.api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { client } from "@/components/Provider";
import { Button } from "@/components/ui/button";
import { postProduct } from "@/common/api/products/products.api";
import { useDropzone } from "react-dropzone";
import { convertIntoFormat } from "@/common/helpers/convertIntoProductFields";
const AddFaqs = () => {
  const router = useRouter();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const [tooltipPreview, setTooltipPreview] = useState<
    string | ArrayBuffer | null
  >("");
  const [tags, settags] = useState([""]);
  const [fields, setfields] = useState<
    {
      key: string;
      type: string;
      order: number | undefined;
    }[]
  >([
    {
      key: "",
      type: "",
      order: undefined,
    },
  ]);
  const formSchema = z.object({
    title: z.string().min(5, {
      message: "Title must be at least 5 characters",
    }),
    description: z.string().min(3, {
      message: "Description must be at least 3 characters",
    }),
    product_type: z.string().min(5, {
      message: "Product type must be at least 5 characters",
    }),
    appstoreLink: z.string().min(3, {
      message: "App Store Link must be at least 3 characters",
    }),
    playstoreLink: z.string().min(3, {
      message: "Play Store Link must be at least 3 characters",
    }),
    image: z
      .instanceof(File)
      .refine((file) => file.size !== 0, "Please upload an image"),
    tooltipImage: z
      .instanceof(File)
      .refine((file) => file.size !== 0, "Please upload tooltipImage an image"),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: postProduct,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (
      values.product_type === "subscription" &&
      fields.length >= 1 &&
      fields[0].order &&
      fields[0].key
    ) {
      toast.error("Provide some fields ");
    }
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("product_type", values.product_type);
    if (values.appstoreLink) {
      formData.append("appstoreLink", values.appstoreLink);
    }
    if (values.playstoreLink) {
      formData.append("playstoreLink", values.playstoreLink);
    }
    if (tags.length > 0) {
      tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });
    }
    console.log(fields);
    if (values.product_type === "subscription") {
      fields.forEach((key: any) => {
        const field = fields[key];
        formData.append(`fields[${key}][type]`, field.type);
        formData.append(`fields[${key}][order]`, String(field.order));
      });
    }
    formData.append("files[0]", values.image);
    if (values.product_type === "subscription") {
      formData.append("files[1]", values.tooltipImage);
    }
    console.log(formData);
    mutateAsync(formData).then(() => {
      toast.success("Product created successfully");
      router.push("/admin/products");
      client.invalidateQueries({ queryKey: ["get-all-products"] });
      client.invalidateQueries({ queryKey: ["get-all-products-with-type"] });
    });
  };

  // dynamic form logic

  const handleAddTag = () => {
    settags([...tags, ""]);
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    settags(updatedTags);
  };
  const handleAddField = () => {
    setfields([...fields, { key: "", type: "", order: undefined }]);
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setfields(updatedFields);
  };

  // file logic for image
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
  // file logic for tooltip Image
  const onTooltipDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setTooltipPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        form.setValue("tooltipImage", acceptedFiles[0]);
        form.clearErrors("tooltipImage");
      } catch (error) {
        setTooltipPreview(null);
        form.resetField("tooltipImage");
      }
    },
    [form]
  );

  const {
    getRootProps: getTooltipRootProps,
    getInputProps: getTooltipInputProps,
    isDragActive: isTooltipDragActive,
    fileRejections: tooltipFileRejections,
  } = useDropzone({
    onDrop: onTooltipDrop,
    maxFiles: 1,
    maxSize: 1000000,
    accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
  });

  return (
    <div className="pt-10">
      <AdminHeader title="New-Product" />
      <div>
        <Card className="mx-10">
          <CardHeader></CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <div>
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
                              placeholder="Enter the question"
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
                    name="appstoreLink"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem className="mb-3">
                          <FormLabel>Appstore Link</FormLabel>
                          <FormControl>
                            <Input
                              className="border border-[#d3d3d1]"
                              placeholder="Enter the appstoreLink"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    name="playstoreLink"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormItem className="mb-3">
                          <FormLabel>Playstore Link</FormLabel>
                          <FormControl>
                            <Input
                              className="border border-[#d3d3d1]"
                              placeholder="Enter the playstoreLink"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />

                  <div>
                    <p className="my-3 text-sm">Fields</p>
                    {fields?.map((item, index) => (
                      <div
                        className="flex justify-between gap-5 my-3"
                        key={index}
                      >
                        <Input
                          placeholder="Enter the Key"
                          onChange={(e) => {
                            const updatedFields = [...fields];
                            updatedFields[index].key = e.target.value;
                            setfields(updatedFields);
                          }}
                        />
                        <Select
                          onValueChange={(value) => {
                            const updatedFields = [...fields];
                            updatedFields[index].type = value;
                            setfields(updatedFields);
                          }}
                        >
                          <SelectTrigger className="">
                            <SelectValue
                              placeholder={`${
                                item.type ? item.type : "Select the  type"
                              }`}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"input"}>Input</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          placeholder="enter the Order"
                          type="number"
                          onChange={(e) => {
                            const updatedFields = [...fields];
                            updatedFields[index].order = +e.target.value;
                            setfields(updatedFields);
                          }}
                        />
                        <Button
                          type="button"
                          variant={"destructive"}
                          size={"sm"}
                          onClick={() => handleRemoveField(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      className="mt-2"
                      type="button"
                      size={"sm"}
                      onClick={handleAddField}
                    >
                      Add Fields
                    </Button>
                  </div>
                  <div>
                    <p className="my-3 text-sm">Tags</p>
                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center mb-2 gap-3 my-2"
                      >
                        <Input
                          type="text"
                          className="border border-[#d3d3d1]"
                          placeholder="Enter the  Tag"
                          value={tag}
                          onChange={(e) => {
                            const updatedTags = [...tags];
                            updatedTags[index] = e.target.value;
                            settags(updatedTags);
                          }}
                        />

                        <Button
                          type="button"
                          variant={"destructive"}
                          size={"sm"}
                          onClick={() => handleRemoveTag(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button type="button" size={"sm"} onClick={handleAddTag}>
                      Add Tags
                    </Button>
                  </div>
                </div>

                <FormField
                  name="product_type"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel className="">Product Type</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field?.value?.toString()}
                          >
                            <SelectTrigger className="">
                              <SelectValue placeholder="Select the Product type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={"gift_card"}>
                                gift_card
                              </SelectItem>
                              <SelectItem value={"subscription"}>
                                subscription
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
                  name="image"
                  control={form.control}
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
                            Image must be less than 1MB and of type png, jpg, or
                            jpeg
                          </p>
                        )}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  name="tooltipImage"
                  control={form.control}
                  render={() => (
                    <FormItem className=" mb-4">
                      <FormLabel
                        className={`${
                          tooltipFileRejections?.length !== 0 &&
                          "text-destructive"
                        }`}
                      >
                        Select Tooltip Image
                      </FormLabel>
                      <FormControl>
                        <div
                          {...getTooltipRootProps()}
                          className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 border rounded-lg  p-8 shadow-sm shadow-foreground"
                        >
                          {tooltipPreview && (
                            <img
                              src={tooltipPreview as string}
                              alt="Uploaded tooltip image"
                              className="max-h-[400px] rounded-lg"
                            />
                          )}
                          <Input
                            {...getTooltipInputProps()}
                            type="file"
                            className="border-none"
                          />
                          {isTooltipDragActive ? (
                            <p>Drop the Tooltip Image!</p>
                          ) : (
                            <p className="text-gray-500">
                              Click here or drag an image to upload it
                            </p>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage>
                        {tooltipFileRejections?.length !== 0 && (
                          <p>
                            Tooltip image must be less than 1MB and of type png,
                            jpg, or jpeg
                          </p>
                        )}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <div className="w-full flex justify-end">
                  <Button
                    type="submit"
                    className="w-[200px] mt-4"
                    disabled={isPending}
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
};

export default AddFaqs;
