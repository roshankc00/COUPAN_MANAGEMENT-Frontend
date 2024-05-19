import { IStoreBody } from "@/interfaces/Store.interface";
import axios from "../api";

export const getAllStores = async () => {
  const { data } = await axios.get(`/store`);
  return data;
};

export const getSingleStoreInfo = async (id: number) => {
  const { data } = await axios.get(`/store/${id}`);
  return data;
};

export const getSearchData = async (text: string) => {
  const { data } = await axios.get(
    `/store/store-cat/search?searchText=${text}`
  );
  return data;
};

export const getAllFollowedStore = async () => {
  const { data } = await axios.get(`/followers/my`);
  return data;
};

export const postStore = async (body: IStoreBody) => {
  const { data } = await axios.post("/store", body);
  return data;
};

export const updateStore = async (body: {
  id: number;
  values: Partial<IStoreBody>;
}) => {
  const { data } = await axios.patch(`/store/${body.id}`, body.values);
  return data;
};

export const deleteStore = async (id: number) => {
  const { data } = await axios.delete(`/store/${id}`);
  return data;
};
