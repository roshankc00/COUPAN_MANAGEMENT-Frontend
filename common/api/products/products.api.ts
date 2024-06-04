import axios from "../api";
export const getAllProductsWithType = async (type: string) => {
  const { data } = await axios.get(`/products?product_type=${type}`);
  return data;
};

export const getAllProducts = async () => {
  const { data } = await axios.get(`/products`);
  return data;
};
