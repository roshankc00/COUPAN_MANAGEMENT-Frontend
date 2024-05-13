import axios from "../api";
export const getAllFaqs = async () => {
  const { data } = await axios.get(`/faqs`);
  return data;
};
