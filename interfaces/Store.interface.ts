import { ICoupon, ISEO } from "./coupon.interface";

export interface IStore {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  imageName: string;
  featured: boolean;
  status: string;
  seo: ISEO;
  coupons: ICoupon[];
}
