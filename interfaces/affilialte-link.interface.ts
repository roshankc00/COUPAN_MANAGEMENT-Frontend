import { IStore } from "./Store.interface";

export interface IAffilateLink {
  id: number;
  tagLine: string;
  cashbackAmountPer: number;
  link: string;
  store: IStore;
}
