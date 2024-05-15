import { IStore } from "./Store.interface";
import { ISubcategory } from "./Subcategory.interface";
import { ICategory } from "./category.interface";

export interface ISEO {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
}

export interface ICoupon {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  tagLine: string;
  code: string;
  startDate: string;
  expireDate: string;
  url: string;
  featured: boolean;
  categoryId: number;
  subCategoryId: number;
  storeId: number;
  imageName: string;
  verified: boolean;
  exclusive: boolean;
  status: string;
  category: ICategory;
  seo: ISEO;
  store: IStore;
  subCategory: ISubcategory;
}
