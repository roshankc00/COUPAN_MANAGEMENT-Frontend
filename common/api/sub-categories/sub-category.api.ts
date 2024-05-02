import axios from "../api";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getAllSubCategories = async () => {
  const { data } = await axios.get(`/sub-categories`);
  return data;
};
