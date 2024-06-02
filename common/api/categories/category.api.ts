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

export const updateCategory = async (body: {
  id: number;
  values: Partial<ICategoryBody>;
}) => {
  const { data } = await axios.patch(`/category/${body.id}`, body.values);
  return data;
};

export const getSingleCategory = async (id: number) => {
  const { data } = await axios.get(`/category/${id}`);
  return data;
};
export const deleteCategory = async (id: number) => {
  const { data } = await axios.delete(`/category/${id}`);
  return data;
};

export const getLatestcategories = async () => {
  const { data } = await axios.get(
    `/category/featured/get-latest-categories?no=10`
  );
  return data;
};
