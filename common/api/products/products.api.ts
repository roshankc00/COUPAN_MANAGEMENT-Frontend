import axios from "../api";
export const getAllProductsWithType = async (type: string) => {
  const { data } = await axios.get(`/products?product_type=${type}`);
  return data;
};

export const getAllProducts = async () => {
  const { data } = await axios.get(`/products`);
  return data;
};
export const postProduct = async (body: any) => {
  const { data } = await axios.post(`/products`, body);
  return data;
};
export const getSingleProduct = async (id: number) => {
  const { data } = await axios.get(`/products/${id}`);
  return data;
};

export const editProduct = async (body: { id: number; values: any }) => {
  const { data } = await axios.patch(`/products/${body.id}`, body.values);
  return data;
};

export const deleteProduct = async (id: number) => {
  const { data } = await axios.delete(`/products/${id}`);
  return data;
};
