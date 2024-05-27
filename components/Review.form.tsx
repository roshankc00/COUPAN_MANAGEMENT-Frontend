import React from "react";
import { z } from "zod";
import { Card, CardContent, CardHeader } from "./ui/card";
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
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { FaStar } from "react-icons/fa";
const ReviewForm = () => {
  const formSchema = z.object({
    content: z.string().min(3, {
      message: " must be of 3 charecter ",
    }),
    rating: z.number(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" grid grid-cols-1"
        >
          <FormField
            name="rating"
            control={form.control}
            render={({ field }) => (
              <>
                <FormItem className="mb-6">
                  <FormControl>
                    <div className="flex gap-2 my-3 justify-center">
                      {[...Array(field.value ? field.value : 0)].map(
                        (_, index) => (
                          <FaStar
                            key={index}
                            color="orange"
                            onClick={() => form.setValue("rating", index + 1)}
                            size={40}
                          />
                        )
                      )}
                      {[...Array(field.value ? 5 - field.value : 5)].map(
                        (_, index) => (
                          <FaStar
                            key={index}
                            onClick={() => form.setValue("rating", index + 1)}
                            size={40}
                          />
                        )
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <>
                <FormItem className="mb-3">
                  <FormLabel>Review</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-[#d3d3d1]"
                      placeholder="Enter the Review"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default ReviewForm;
