"use client";
import { UseGetAllProductsWithType } from "@/hooks/react-query/products/get-all-products-with-type";
import React, { useCallback, useEffect, useState } from "react";
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
import { FaQuestion } from "react-icons/fa6";
import { SiAdguard } from "react-icons/si";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import debounce from "lodash.debounce";
import { useMutation } from "@tanstack/react-query";
import { postOrder } from "@/common/api/orders/orders.api";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import { UseGetSingleProduct } from "@/hooks/react-query/products/get-single-product";

type Props = {
  productId: number;
};

const ProductDetails: React.FC<Props> = ({ productId }) => {
  const { isLogedInStatus } = useSelector((state: IRootState) => state.auth);
  const router = useRouter();
  const [activeSubProduct, setactiveSubProduct] = useState<any>({});
  const formSchema = z.object({
    userId: z.string().min(5, {
      message: " must be of 5 characters ",
    }),
    usercontent: z.string().min(5, {
      message: "must be of 5 characters ",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      usercontent: "",
    },
  });

  const { mutateAsync, isPending: orderPending } = useMutation({
    mutationFn: postOrder,
    onSuccess(data) {
      toast.success("Order placed successfully");
      router.push(`/user/order/${data?.id}?price=${activeSubProduct?.price}`);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!activeSubProduct) {
      return toast.error("Select the product");
    } else if (!isLogedInStatus) {
      toast.error("Login first");
      router.push("/login");
    } else {
      mutateAsync({ ...values, productId: +activeSubProduct?.id });
    }
  };

  const handleGiftCardOrderSubmit = () => {
    if (!activeSubProduct?.id) {
      return toast.error("Select the product");
    } else {
      mutateAsync({
        subProductId: +activeSubProduct?.id,
      });
    }
  };

  const {
    data: productItem,
    isFetching: singleProductFetching,
    isLoading: singleProductLoading,
    refetch,
  } = UseGetSingleProduct(+productId);

  useEffect(() => {
    refetch();
  }, [productId]);

  return (
    <div className="mt-10">
      <div className="grid grid-cols-7 md:grid-cols-7 gap-10">
        <div className="col-span-2 md:col-span-2 shadow-sm rounded-sm pb-10 ">
          <div>
            <img
              src={productItem?.imageUrl}
              className="h-[200px] w-full shadow-sm"
              alt=""
            />
            <h1 className=" font-bold my-4">{productItem?.title}</h1>
            <div className="flex gap-1  mb-4">
              <Button className=" flex gap-3 w-[150px]">
                {" "}
                <SiAdguard />
                Instant Delivery
              </Button>
              <Button className=" flex gap-3 w-[150px]">
                Official Distributor
              </Button>
            </div>
            <h1 className="text-sm font-medium text">
              {productItem?.description}
            </h1>
          </div>
        </div>
        <div className="col-span-4 md:col-span-5 ">
          {productItem?.product_type === "subscription" && (
            <div className=" relative">
              <h1 className="w-10 h-10 rounded-full shadow-sm bg-blue-500 m-1 absolute text-white flex justify-center items-center left-2 -top-5 text-2xl font-bold">
                1
              </h1>
              <h1 className="absolute left-16 text-xl font-medium">Buy</h1>
              <Card className="">
                <CardHeader></CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form id="orderForm" onSubmit={form.handleSubmit(onSubmit)}>
                      <div className="flex gap-10 items-center">
                        <FormField
                          name="userId"
                          control={form.control}
                          render={({ field }) => (
                            <>
                              <FormItem className="mb-3">
                                <FormControl>
                                  <Input
                                    className="border border-[#d3d3d1]"
                                    placeholder="UserId"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            </>
                          )}
                        />
                        <FormField
                          name="usercontent"
                          control={form.control}
                          render={({ field }) => (
                            <>
                              <FormItem className="mb-3">
                                <div className="flex items-center gap-2">
                                  <FormControl>
                                    <Input
                                      className="border border-[#d3d3d1]"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FaQuestion
                                    className="text-blue-600"
                                    size={25}
                                  />
                                </div>
                                <FormMessage />
                              </FormItem>
                            </>
                          )}
                        />
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          )}
          <div className=" mt-10 border p-4 relative">
            <h1 className="w-10 h-10 rounded-full shadow-sm bg-blue-500 m-1 absolute text-white flex justify-center items-center left-2 -top-5 text-2xl font-bold">
              {productItem?.product_type === "subscription" ? 2 : 1}
            </h1>
            <h1 className="absolute left-16 text-xl font-medium -mt-4">
              {productItem?.product_type === "subscription"
                ? "Select Recharge"
                : "Select voucher"}
            </h1>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-5">
              {!singleProductFetching &&
                !singleProductLoading &&
                productItem?.subProductItems &&
                productItem?.subProductItems.map((item: any) => (
                  <div
                    key={item.id}
                    onClick={() => setactiveSubProduct(item)}
                    className={`shadow-sm p-2 rounded-md mt-2 border cursor-pointer  ${
                      activeSubProduct.id === item.id ? " border-blue-500" : ""
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
          <div className="flex flex-row-reverse">
            {productItem?.product_type === "subscription" ? (
              <Button
                type="submit"
                form="orderForm"
                className="w-[200px] mt-4"
                disabled={orderPending}
              >
                Place Order
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-[200px] mt-4"
                disabled={orderPending}
                onClick={() => handleGiftCardOrderSubmit()}
              >
                Place Order
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;