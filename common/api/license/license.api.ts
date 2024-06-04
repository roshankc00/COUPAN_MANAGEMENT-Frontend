import axios from "../api";
export const getLicenses = async () => {
  const { data } = await axios.get(`/license`);
  return data;
};
