import axios from "../api";

export const getAllStores = async () => {
  const { data } = await axios.get(`/store`);
  return data;
};

export const getSingleStoreInfo = async (id: number) => {
  const { data } = await axios.get(`/store/${id}`);
  return data;
};
