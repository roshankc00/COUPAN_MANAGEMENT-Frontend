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
