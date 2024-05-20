interface BlogFormData {
  title: string;
  description: string;
  thumbnail: File;
  items: {
    title: string;
    description: string;
    image?: File;
    isImage: boolean;
  }[];
}
import axios from "../api";
export const postBlog = async (body: BlogFormData) => {
  const { data } = await axios.post(`/blogs`, body);
  return data;
};
export const getAllBlogs = async (page: number, pageSize: number) => {
  const { data } = await axios.get(`/blogs?page=${page}&pageSize=${pageSize}`);
  return data;
};

export const getSingleBlog = async (id: number) => {
  const { data } = await axios.get(`/blogs/${id}`);
  return data;
};

export const updateBlog = async (body: { id: number; values: any }) => {
  const { data } = await axios.patch(`/blogs/${body.id}`, body.values);
  return data;
};

export const deleteStore = async (id: number) => {
  const { data } = await axios.delete(`/blogs/${id}`);
  return data;
};
