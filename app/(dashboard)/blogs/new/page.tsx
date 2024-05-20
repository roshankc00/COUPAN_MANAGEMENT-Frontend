"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Editor } from "@/components/editor";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
  title: z.string().min(1, {
    message: "Description is required",
  }),
  thumbnail: z
    .instanceof(File)
    .refine((file) => file.size !== 0, "Please upload an image"),
  items: z.array(
    z.object({
      description: z.string().min(1, {
        message: "Description is required",
      }),
      title: z.string().min(1, {
        message: "Description is required",
      }),
      image: z.instanceof(File).optional(),
      isImage: z.boolean(),
    })
  ),
});

export const AddNewBlogs = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      title: "",
      thumbnail: new File([""], "filename"),
      items: [
        {
          description: "",
          title: "",
          image: new File([""], "filename"),
          isImage: false,
        },
      ],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    alert("");
    console.log(values);
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  return (
    <div className="mt-6 border bg-white  rounded-md p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
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
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Editor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="thumbnail"
            control={form.control}
            render={({ field }) => (
              <>
                <FormItem className="mb-3">
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          {fields.map((item: any, index: number) => (
            <div
              key={`${item?.title}-${index}`}
              className="mt-20 border border-slate-500 p-4 rounded"
            >
              <FormField
                name={`items.${index}.title`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter item title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={`items.${index}.description`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Description</FormLabel>
                    <FormControl>
                      <Editor {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={`items.${index}.image`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => {
                          field.onChange(e.target.files?.[0]);
                          form.setValue(
                            `items.${index}.isImage`,
                            !!e.target.files?.[0]
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="destructive"
                type="button"
                onClick={() => remove(index)}
                className="mt-5 w-full"
              >
                Remove Item
              </Button>
            </div>
          ))}
          <div>
            <Button
              type="button"
              onClick={() =>
                append({
                  title: "",
                  description: "",
                  image: new File([""], "filename"),
                  isImage: false,
                })
              }
              className="w-full my-2"
            >
              Add Item
            </Button>
          </div>
          <div className="flex items-center gap-x-2 my-5">
            <Button type="submit" className="w-full">
              Save Blog
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddNewBlogs;
