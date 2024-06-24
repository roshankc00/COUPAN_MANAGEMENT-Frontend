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
  FormMessage,
} from "@/components/ui/form";
import fonePayImage from "../../../../../../public/phonepay.png";
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
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

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
      mutateAsync({ ...values, subProductId: +activeSubProduct?.id });
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
      <div className="grid grid-cols-7 md:grid-cols-9 gap-10">
        <div className="col-span-3 md:col-span-3 shadow-sm rounded-sm pb-10 ">
          <Card>
            <CardContent className="p-3">
              <div>
                <img
                  src={productItem?.imageUrl}
                  className="h-[200px] w-full shadow-sm border p-2 rounded-md"
                  alt=""
                />
                <h1 className=" font-bold text-xl my-4 text-center">
                  {productItem?.title}
                </h1>
                <div className="flex gap-1 flex-wrap justify-center items-center  mb-4">
                  <Button className=" text-[10px]  ">Instant Delivery</Button>
                  <Button className=" text-[10px]  ">
                    Official Distributor
                  </Button>
                </div>
                <Separator className="my-2" />
                <p className="text-sm   font-bold">
                  {productItem?.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-4 md:col-span-6 ">
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
                    className={`shadow-sm p-2  rounded-md mt-2 border cursor-pointer  ${
                      activeSubProduct.id === item.id
                        ? " #d9d1ff border-blue-500 border-2"
                        : ""
                    }`}
                  >
                    <p className="text-center font-semibold">{item.title}</p>
                    <Separator className="mt-5" />
                    <p className="text-right text-red-600 font-medium py-1">
                      Rs {item.price}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className=" relative mt-10">
            <h1 className="w-10 h-10 rounded-full shadow-sm bg-blue-500 m-1 absolute text-white flex justify-center items-center left-2 -top-5 text-2xl font-bold">
              {productItem?.product_type === "subscription" ? 3 : 2}
            </h1>
            <h1 className="absolute left-16 text-xl font-medium">
              Select payment
            </h1>
            <div className="">
              <Card
                className={`${
                  activeSubProduct.id
                    ? "border bg-#d9d1ff border-blue-600 "
                    : ""
                }`}
              >
                <CardContent className="flex justify-between px-4 items-center">
                  <Image
                    className="w-[120px] mt-10 h-[50px] rounded-md shadow-sm"
                    src={fonePayImage}
                    alt="Logo"
                  />

                  {activeSubProduct.id && (
                    <div className="mt-8 text-xl font-bold text-blue-700">
                      Rs {activeSubProduct.price}
                    </div>
                  )}
                </CardContent>
              </Card>
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
