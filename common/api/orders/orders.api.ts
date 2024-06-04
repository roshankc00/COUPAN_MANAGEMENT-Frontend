import axios from "../api";
export const postOrder = async (body: any) => {
  const { data } = await axios.post(`/orders`, body);
  return data;
};

export const getAllOrder = async () => {
  const { data } = await axios.post(`/orders`);
  return data;
};
