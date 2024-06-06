import axios from "../api";
export const getLicenses = async () => {
  const { data } = await axios.get(`/license`);
  return data;
};
export const postLicense = async (body: any) => {
  const { data } = await axios.post(`/license`, body);
  return data;
};

export const getSingleLicense = async (id: number) => {
  const { data } = await axios.get(`/license/${id}`);
  return data;
};
export const updateLicense = async (body: { id: number; values: any }) => {
  const { data } = await axios.post(`/license/${body.id}`, body.values);
  return data;
};

export const deleteLicense = async (id: number) => {
  const { data } = await axios.delete(`/license/${id}`);
  return data;
};
