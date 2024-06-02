import { ICoupon } from "@/interfaces/coupon.interface";

export const alreadySaved = (couponId: number, wishlists: any) => {
  const item = wishlists?.find((item: any) => item?.coupon.id == couponId);
  return item ? true : false;
};
