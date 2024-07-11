import axios from "../api";
export const getAllHomeDetails = async () => {
  const { data } = await axios.get(`/home`);
  return data;
};

export const addSingleHomeImage = async (body: any) => {
  const { data } = await axios.patch(`/home/add/images`, body);
  return data;
};

export const deleteSingleHomeImage = async (id: number) => {
  const { data } = await axios.delete(`/home/remove/item/${id}`);
  return data;
};
