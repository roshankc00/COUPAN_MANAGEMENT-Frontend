import { ISubcategoryBody } from "@/interfaces/Subcategory.interface";
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

export const postSubCategory = async (body: ISubcategoryBody) => {
  const { data } = await axios.post("/sub-categories", body);
  return data;
};

export const updateSubCategory = async (body: Partial<ISubcategoryBody>) => {
  const { data } = await axios.patch("/sub-categories", body);
  return data;
};
