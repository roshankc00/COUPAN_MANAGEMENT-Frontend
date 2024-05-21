import axios from "../api";
export const postOffer = async (body: any) => {
  const { data } = await axios.post(`/submit-offer`, body);
  return data;
};
