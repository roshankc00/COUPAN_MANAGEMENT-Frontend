import axios from "../api";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getAllCategories = async () => {
  const { data } = await axios.get(`/category`);
  return data;
};
