import { ICoupon } from "@/interfaces/coupon.interface";

export const alreadySaved = (couponId: number, wishlists: any) => {
  const item = wishlists?.coupons?.find((item: ICoupon) => item.id == couponId);
  return item ? true : false;
};
