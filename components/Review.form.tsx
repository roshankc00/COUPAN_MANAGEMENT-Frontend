"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { FaStar } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import {
  QueryObserverBaseResult,
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { postReview } from "@/common/api/review/review.api";
import toast from "react-hot-toast";
import { client } from "./Provider";
interface Props {
  couponId: number;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverBaseResult<any, Error>>;
}

const ReviewForm: React.FC<Props> = ({ couponId, refetch }) => {
  const [open, setopen] = useState(false);
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

  const { mutateAsync } = useMutation({
    mutationFn: postReview,
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutateAsync({ ...values, couponId: +couponId }).then(() => {
      toast.success("Review Added successfully");
      client.invalidateQueries({ queryKey: ["getReviewStatus"] });
      setopen(false);
      refetch();
    });
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setopen}>
        <DialogTrigger>
          <button className="bg-blue-600 text-white  p-2 px-3 rounded-md shadow-sm">
            Add Review
          </button>
        </DialogTrigger>
        <DialogContent>
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
                                onClick={() =>
                                  form.setValue("rating", index + 1)
                                }
                                size={40}
                              />
                            )
                          )}
                          {[...Array(field.value ? 5 - field.value : 5)].map(
                            (_, index) => (
                              <FaStar
                                key={index}
                                onClick={() =>
                                  form.setValue("rating", index + 1)
                                }
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
              <DialogFooter>
                <Button type="submit"> Save</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewForm;
