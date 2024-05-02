import axios from "../api";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// export const loginUser = async (logindata: ILoginUser) => {
//   const { data } = await axios.post(`/auth/login`, logindata);
//   return data;
// };

// export const signupUser = async (signupdata: ILoginUser) => {
//   const { data } = await axios.post(`/auth/login`, signupdata);
//   return data;
// };

export const getAllStores = async () => {
  const { data } = await axios.get(`/store`);
  return data;
};
