import axios from "../api";
export const getAllHomeDetails = async () => {
  const { data } = await axios.get(`/home`);
  return data;
};
