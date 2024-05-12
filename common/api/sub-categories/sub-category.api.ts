import axios from "../api";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getAllSubCategories = async () => {
  const { data } = await axios.get(`/sub-categories`);
  return data;
};

export const getAllSubcategoriesOfParticularCategory = async (
  categoryId: number
) => {
  const { data } = await axios.get(`/sub-categories?categoryId=${categoryId}`);
  return data;
};
