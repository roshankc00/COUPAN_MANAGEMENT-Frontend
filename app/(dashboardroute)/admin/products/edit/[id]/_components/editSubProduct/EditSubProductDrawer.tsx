"use client";
import React from "react";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { editSubProduct } from "@/common/api/sub-products/subproduct.api";
import toast from "react-hot-toast";
import { client } from "@/components/Provider";
import { Input } from "@/components/ui/input";
import { deleteSubProduct } from "../../../../../../../../common/api/sub-products/subproduct.api";
import DeleteSubProductButton from "@/app/(dashboardroute)/admin/sub-product/_component/Edit-Delete.button";

type Props = {
  item: any;
};
const EditSubProductDrawer: React.FC<Props> = ({ item }) => {
  const formSchema = z.object({
    title: z.string().min(5, {
      message: " must be of 5 charecter ",
    }),
    description: z.string().min(5, {
      message: "must be of 5 charecter ",
    }),
    price: z.string(),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: editSubProduct,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: item?.title,
      description: item?.description,
      price: item?.price.toString(),
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutateAsync({
      id: item?.id,
      values: {
        ...values,
        price: +values?.price,
      },
    }).then(() => {
      toast.success("Sub Product Updated successfully");
      client.invalidateQueries({ queryKey: ["get-single-product"] });
    });
  };

  const { mutateAsync: handleDeleteSubProduct } = useMutation({
    mutationFn: deleteSubProduct,
    onSuccess() {
      toast.success("Subproduct deleted successfully");
      client.invalidateQueries({ queryKey: ["get-single-product"] });
    },
  });

  return (
    <div className="">
      <div>
        <Sheet>
          <SheetTrigger>
            <Button>EditSubProduct</Button>
          </SheetTrigger>
          <SheetContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
                <h1 className="text-center text-xl my-5">
                  Add SubProduct form
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
                  name="price"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-[#d3d3d1]"
                            placeholder="Enter the Price"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <div className="w-full grid grid-cols-2 gap-2 mt-4">
                  <Button
                    type="button"
                    variant={"destructive"}
                    onClick={() => handleDeleteSubProduct(item?.id)}
                  >
                    Delete
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    Add SubProduct
                  </Button>
                </div>
              </form>
            </Form>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default EditSubProductDrawer;
