import { ILoginUser } from "@/interfaces/user.interface";
import axios from "../api";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const loginUser = async (logindata: ILoginUser) => {
  const { data } = await axios.post(`/auth/login`, logindata);
  return data;
};

export const signupUser = async (signupdata: ILoginUser) => {
  const { data } = await axios.post(`/auth/login`, signupdata);
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await axios.get(`/auth/me`);
  return data;
};

export const getAllUsers = async () => {
  const { data } = await axios.get(`/users`);
  return data;
};