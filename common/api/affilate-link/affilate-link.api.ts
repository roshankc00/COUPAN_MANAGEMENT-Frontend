import axios from "../api";

export const postAffilateLink = async (body: any) => {
  const { data } = await axios.post(`/affiliate-link`, body);
};

export const getAllAffilateLinks = async () => {
  const { data } = await axios.get(`/affiliate-link`);
  return data;
};

export const getSingleAffilateLink = async (id: number) => {
  const { data } = await axios.get(`/affiliate-link/${id}`);
  return data;
};
export const deleteAffilateLink = async (id: number) => {
  const { data } = await axios.delete(`/affiliate-link/${id}`);
  return data;
};

export const updateAffilateLink = async (body: { id: number; values: any }) => {
  const { data } = await axios.patch(`/affiliate-link/${body.id}`, body.values);
  return data;
};

export const increaseCount = async (id: number) => {
  const { data } = await axios.patch(`/affiliate-link/increase/count/${id}`);
  return data;
};
