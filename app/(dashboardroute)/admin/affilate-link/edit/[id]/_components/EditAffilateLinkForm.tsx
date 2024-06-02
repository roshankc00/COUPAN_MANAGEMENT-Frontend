"use client";
import React, { useEffect } from "react";
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
import { UseGetSingleSubCategory } from "@/hooks/react-query/sub-categories/get_single_sub-category";
import { ISubcategory } from "@/interfaces/Subcategory.interface";
import { useMutation } from "@tanstack/react-query";
import { updateSubCategory } from "@/common/api/sub-categories/sub-category.api";
import { client } from "@/components/Provider";
import { updateAffilateLink } from "@/common/api/affilate-link/affilate-link.api";

type Props = {
  singleData: any;
  id: number;
};

function EditAffilateLinkForm({ id, singleData }: Props) {
  const router = useRouter();
  const formSchema = z.object({
    link: z.string().min(3, {
      message: " must be of 3 charecter ",
    }),
    merchant: z.string().min(3, {
      message: " must be of 3 charecter ",
    }),
    apiKey: z.string().optional(),
    apiLink: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: singleData?.link,
      merchant: singleData?.merchant,
      apiKey: singleData?.apiKey ?? "",
      apiLink: singleData?.apiLink ?? "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: updateAffilateLink,
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutateAsync({ id, values })
      .then(() => {
        toast.success("affilateLink updated successfully");
        router.push("/admin/affilate-link");
        client.invalidateQueries({ queryKey: ["affilateLink"] });
      })
      .catch(() => {
        toast.error("Unable to update sub-categories");
      });
  };

  const { data, isFetching, isLoading } = UseGetAllCategory();

  return (
    <div className="mt-10">
      <AdminHeader title="New-Subcategory" />
      <div>
        <Card className=" ms-24">
          <CardHeader></CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="link"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Link</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-[#d3d3d1]"
                            placeholder="Enter the Link"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  name="merchant"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Mechat</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-[#d3d3d1]"
                            placeholder="Enter the merchat"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  name="apiLink"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Api Link</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-[#d3d3d1]"
                            placeholder="Enter the api Link"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  name="apiKey"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-3">
                        <FormLabel>Api Key</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-[#d3d3d1]"
                            placeholder="Enter the Api key"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <Button type="submit"> Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default EditAffilateLinkForm;
