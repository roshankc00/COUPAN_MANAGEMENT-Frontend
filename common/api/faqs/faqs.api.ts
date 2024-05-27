import axios from "../api";
export const getAllFaqs = async () => {
  const { data } = await axios.get(`/faqs`);
  return data;
};
export const postFaqs = async (body: any) => {
  const { data } = await axios.post(`/faqs`, body);
  return data;
};

export const getAFaq = async (id: number) => {
  const { data } = await axios.get(`/faqs/${id}`);
  return data;
};
export const updateFaq = async (body: { id: number; values: any }) => {
  const { data } = await axios.patch(`/faqs/${body.id}`, body.values);
  return data;
};
