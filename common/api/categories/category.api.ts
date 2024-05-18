import { ICategoryBody } from "@/interfaces/category.interface";
import axios from "../api";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getAllCategories = async () => {
  const { data } = await axios.get(`/category`);
  return data;
};

export const postCategory = async (body: ICategoryBody) => {
  const { data } = await axios.post("/category", body);
  return data;
};

export const updateCategory = async (body: Partial<ICategoryBody>) => {
  const { data } = await axios.patch("/category", body);
  return data;
};
