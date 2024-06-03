import { ISeoBody } from "./Subcategory.interface";
import { ICoupon, ISEO } from "./coupon.interface";
import { IAffilateLink } from "./affilialte-link.interface";

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
  affiliateLink: IAffilateLink;
}

export interface IStoreBody {
  title: string;
  description: string;
  featured: boolean;
  seo: ISeoBody;
  status: string;
}
