import axios from "../api";

export const getAllSubProducts = async () => {
  const { data } = await axios.get(`/sub-product`);
  return data;
};
export const postSubProduct = async (body: any) => {
  const { data } = await axios.post(`/sub-product`, body);
  return data;
};
export const getSingleSubProduct = async (id: number) => {
  const { data } = await axios.get(`/sub-product/${id}`);
  return data;
};

export const editSubProduct = async (body: { id: number; values: any }) => {
  const { data } = await axios.patch(`/sub-product/${body.id}`, body.values);
  return data;
};

export const deleteSubProduct = async (id: number) => {
  const { data } = await axios.delete(`/sub-product/${id}`);
  return data;
};
