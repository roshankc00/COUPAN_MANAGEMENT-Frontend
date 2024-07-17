"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { postLicense } from "@/common/api/license/license.api";
import { client } from "@/components/Provider";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

type Props = {
  subProductId: number;
};

const AddLicenseFromOrder: React.FC<Props> = ({ subProductId }) => {
  const [openSheet, setopenSheet] = useState(false);
  const formSchema = z.object({
    title: z.string().min(5, {
      message: " must be of 5 charecter ",
    }),
    code: z.string().min(3, {
      message: "must be of 3 charecter ",
    }),
    validityDays: z.string().optional(),
    expireDate: z.string().optional(),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: postLicense,
    onSuccess(data, variables, context) {
      setopenSheet(false);
      client.invalidateQueries({ queryKey: ["get-all-licenses"] });
      client.invalidateQueries({
        queryKey: ["get-all-not-assigned-licenses"],
      });
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.validityDays && values.expireDate) {
      mutateAsync({
        title: values.title,
        code: values.code,
        validityDays: +values.validityDays,
        expireDate: values.expireDate,
        subProductId: +subProductId,
      }).then(() => {
        toast.success("License added successfully");
      });
    } else {
      if (!values.validityDays && !values.expireDate) {
        mutateAsync({
          title: values.title,
          code: values.code,
          subProductId: +subProductId,
        }).then(() => {
          toast.success("License added successfully");
        });
      } else {
        toast.error("Provide both validityDays and expireDate ");
      }
    }
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      code: "",
      expireDate: "",
    },
  });
  return (
    <div>
      <Sheet open={openSheet} onOpenChange={setopenSheet}>
        <SheetTrigger>
          <Button> Add New License</Button>
        </SheetTrigger>
        <SheetContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <h1>Add New License</h1>
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
                name="code"
                control={form.control}
                render={({ field }) => (
                  <>
                    <FormItem className="mb-3">
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Input
                          className="border border-[#d3d3d1]"
                          placeholder="Enter the code"
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
                name="validityDays"
                control={form.control}
                render={({ field }) => (
                  <>
                    <FormItem className="mb-3">
                      <FormLabel>Validity Days</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="border border-[#d3d3d1]"
                          placeholder="Enter the validityDays"
                          {...field}
                        />
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
  );
};

export default AddLicenseFromOrder;
