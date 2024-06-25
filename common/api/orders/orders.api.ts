import axios from "../api";
export const postOrder = async (body: any) => {
  const { data } = await axios.post(`/orders`, body);
  return data;
};

export const getAllOrder = async () => {
  const { data } = await axios.get(`/orders`);
  return data;
};

export type IOrderStatus = "pending" | "completed" | "rejected";

export const getAllOrderWithStatus = async (status: IOrderStatus) => {
  const { data } = await axios.get(`/orders?status=${status}`);
  return data;
};

export const rejectOrder = async (orderId: number) => {
  const { data } = await axios.patch(`/orders/reject/${orderId}`);
  return data;
};

export const pendingOrder = async (orderId: number) => {
  const { data } = await axios.patch(`/orders/pending/${orderId}`);
  return data;
};

export const getSingleOrder = async (orderId: number) => {
  const { data } = await axios.get(`/orders/${orderId}`);
  return data;
};

export const getAllMyOrder = async () => {
  const { data } = await axios.get(`/orders/mine/orders`);
  return data;
};
