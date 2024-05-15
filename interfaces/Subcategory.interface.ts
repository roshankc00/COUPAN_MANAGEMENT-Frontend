import { ICategory } from "./category.interface";
import { ICoupon, ISEO } from "./coupon.interface";

export interface ISubcategory {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  seo: ISEO;
  status: string;
  category: ICategory;
  coupon: ICoupon[];
}
