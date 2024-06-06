import axios from "../api";
export const getLicenses = async () => {
  const { data } = await axios.get(`/license`);
  return data;
};
export const postLicense = async (body: any) => {
  const { data } = await axios.post(`/license`, body);
  return data;
};
