import { ISeoBody, ISubcategory } from "./Subcategory.interface";
import { ICoupon, ISEO } from "./coupon.interface";

export interface ISeo {
  title: string;
  description: string;
}

export interface ICategory {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  imageUrl: string;
  status: string;
  showInMenu: boolean;
  featured: boolean;
  coupons: ICoupon[];
  seo: ISEO;
  subcategories: ISubcategory[];
}

export interface ICategoryBody {
  title: string;
  description: string;
  showInMenu: boolean;
  featured: boolean;
  status: string;
  seo: ISeoBody;
  image: string | ArrayBuffer | null;
}
