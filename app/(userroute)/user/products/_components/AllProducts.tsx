"use client";
import { UseGetAllProductsWithType } from "@/hooks/react-query/products/get-all-products-with-type";
import React, { useCallback, useState } from "react";
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import debounce from "lodash.debounce";
import { useMutation } from "@tanstack/react-query";
import { postOrder } from "@/common/api/orders/orders.api";
import Payment from "./Payment";

const AllProducts = () => {
  const ALL_ROUTES = ["gift_card", "subscription"];
  const [active, setactive] = useState("gift_card");
  const [activeProduct, setactiveProduct] = useState<any>({});
  const {
    data: allProducts,
    isFetching: productFetching,
    isLoading: productLoading,
    refetch,
  } = UseGetAllProductsWithType(active);
  const onRefresh = () => refetch();
  const debouncedSubmit = debounce(onRefresh, 400);
  const _debounceSubmit = useCallback(debouncedSubmit, []);

  const formSchema = z.object({
    name: z.string().min(5, {
      message: " must be of 5 charecter ",
    }),
    email: z.string().min(5, {
      message: "must be of 5 charecter ",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: postOrder,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!activeProduct) {
      return toast.error("Select the product");
    } else {
      mutateAsync({ ...values, productId: +activeProduct }).then(() => {
        toast.success("Order placed sucessfully");
      });
    }
  };
  return (
    <div className="mt-10">
      <div className="grid grid-cols-5 gap-10">
        <div className="col-span-1">
          <ul>
            <li className="font-medium my-3">All Category</li>
            {ALL_ROUTES.map((item) => (
              <li key={item} className="flex items-center my-3">
                <input
                  type="checkbox"
                  id={`color-${item}`}
                  className="h-4 w-4  rounded border-gray-300 text-indigo-600 focus:text-indigo-600"
                  onChange={() => {
                    setactive(item);
                    _debounceSubmit();
                  }}
                  checked={active === item}
                />
                <label
                  htmlFor={`checkbox`}
                  className="ml-3 text-sm text-gray-600"
                >
                  {item}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-4 ">
          <div className="border p-4 relative">
            <h1 className="w-10 h-10 rounded-full shadow-sm bg-blue-500 m-1 absolute text-white flex justify-center items-center left-2 -top-5 text-2xl font-bold">
              1
            </h1>
            <h1 className="absolute left-16 text-xl font-medium -mt-4">
              {active === "subscription" ? "Select Recharge" : "Select voucher"}
            </h1>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-5">
              {!productFetching &&
                !productLoading &&
                allProducts.map((item: any) => (
                  <div
                    key={item.id}
                    onClick={() => setactiveProduct(item)}
                    className={`shadow-sm p-2 rounded-md mt-2 border cursor-pointer  ${
                      activeProduct.id === item.id ? " border-blue-500" : ""
                    }`}
                  >
                    <p className="text-center font-semibold">{item.title}</p>
                    <p className="text-right text-red-600 font-medium py-3">
                      Rs {item.price}
                    </p>
                  </div>
                ))}
            </div>
          </div>
          <div className="mt-10 relative">
            <h1 className="w-10 h-10 rounded-full shadow-sm bg-blue-500 m-1 absolute text-white flex justify-center items-center left-2 -top-5 text-2xl font-bold">
              2
            </h1>
            <h1 className="absolute left-16 text-xl font-medium">
              Request Payment
            </h1>
            <Card className="">
              <CardContent>
                <Payment item={active} />
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 relative">
            <h1 className="w-10 h-10 rounded-full shadow-sm bg-blue-500 m-1 absolute text-white flex justify-center items-center left-2 -top-5 text-2xl font-bold">
              2
            </h1>
            <h1 className="absolute left-16 text-xl font-medium">Buy</h1>
            <Card className="">
              <CardHeader></CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <>
                          <FormItem className="mb-3">
                            <FormLabel>User Name</FormLabel>
                            <FormControl>
                              <Input
                                className="border border-[#d3d3d1]"
                                placeholder="Enter the name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />
                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <>
                          <FormItem className="mb-3">
                            <FormLabel>
                              Make sure your email address is correct, we will
                              use it to deliver your voucher code.
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="border border-[#d3d3d1]"
                                placeholder="Enter the email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />
                    <div className="w-full flex justify-end">
                      <Button type="submit" className="w-[200px] mt-4">
                        Place Order
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
