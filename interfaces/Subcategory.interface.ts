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

export interface ISubcategoryBody {
  title: string;
  description: string;
  categoryId: number;
  status: string;
  seo: ISeoBody;
}

export interface ISeoBody {
  title: string;
  description: string;
}
