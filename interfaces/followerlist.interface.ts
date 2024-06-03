import { IStore } from "./Store.interface";
import { IUser } from "./user.interface";
export interface IFollowerList {
  userId: number;
  storeId: number;
  user: IUser;
  store: IStore;
}
