"use client";
import { UseGetAllHomeDetails } from "@/hooks/react-query/home/get-all-home-details";
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
import React, { useState } from "react";
import HomeImageCard from "./_components/HomeImage.card";
import AdminHeader from "../_component/Header";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import { addSingleHomeImage } from "@/common/api/home/home.api";
import toast from "react-hot-toast";
import { client } from "@/components/Provider";
import { Button } from "@/components/ui/button";

const HomeImage = () => {
  const { data, isFetching, isLoading } = UseGetAllHomeDetails();
  const [open, setopen] = useState(false);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const formSchema = z.object({
    image: z
      .instanceof(File)
      .refine((file) => file.size !== 0, "Please upload an image"),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: new File([""], "filename"),
    },
  });

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

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addSingleHomeImage,
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("files", values.image);
    mutateAsync(formData).then(() => {
      toast.success("Image  Added successfully");
      client.invalidateQueries({ queryKey: ["home-details"] });
    });
    setopen(false);
  };

  return (
    <div className="mt-10">
      <AdminHeader title="Upload-Slider-Images" />
      <div className="flex flex-row-reverse ">
        <Dialog open={open} onOpenChange={setopen}>
          <DialogTrigger className="mr-10 my-10">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add More Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <Card className="mx-10">
              <CardHeader></CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                Image must be less than 1MB and of type png,
                                jpg, or jpeg
                              </p>
                            )}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full mt-4">
                      Save
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 gap-10 mx-10">
        {!isLoading &&
          !isFetching &&
          data &&
          data[0]?.homeItem?.map((item: any) => (
            <HomeImageCard key={item} item={item} />
          ))}
      </div>
    </div>
  );
};

export default HomeImage;
