"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { updateSubProductHeader } from "@/common/api/products/products.api";
import { client } from "@/components/Provider";

type Props = {
  id: number;
  header: string;
};
const UpdateSubProductHeader: React.FC<Props> = ({ header, id }) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateSubProductHeader,
  });

  const formSchema = z.object({
    subProductTitle: z.string().min(5, {
      message: " must be of 5 charecter ",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subProductTitle: header ? header : "",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ ...values, id });
    mutateAsync({ id, data: values }).then(() => {
      client.invalidateQueries({ queryKey: ["get-all-products"] });
      client.invalidateQueries({ queryKey: ["get-single-product"] });
    });
  };
  return (
    <div className="w-full mt-5">
      <Card className="py-4 w-full">
        <CardContent>
          <CardTitle className="text-[18px] font-medium ">
            {" "}
            SubProduct Title
          </CardTitle>
          <Separator className="my-4" />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-5 gap-2 mt-3"
            >
              <div className="col-span-4">
                <FormField
                  name="subProductTitle"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="">
                        <FormControl>
                          <Input
                            className="border border-[#d3d3d1] "
                            placeholder="Enter the SubProductHeader"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
              </div>

              <Button type="submit" className="col-span-1 w-full">
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateSubProductHeader;
