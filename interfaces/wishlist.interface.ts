import { ICoupon } from "./coupon.interface";
import { IUser } from "./user.interface";
export interface IWishlistInterface {
  userId: number;
  storeId: number;
  user: IUser;
  coupon: ICoupon;
}
