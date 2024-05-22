import axios from "../api";
export const postFeedback = async (body: any) => {
  const { data } = await axios.post(`/feedback`, body);
  return data;
};
export const getAllFeedback = async () => {
  const { data } = await axios.get(`/feedback`);
  return data;
};
