import { ILoginUser, IResetPassword } from "@/interfaces/user.interface";
import axios from "../api";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const loginUser = async (logindata: ILoginUser) => {
  const { data } = await axios.post(`/auth/login`, logindata);
  return data;
};

export const signupUser = async (signupdata: ILoginUser) => {
  const { data } = await axios.post(`/auth/signup`, signupdata);
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

export const forgetPassword = async (email: string) => {
  const { data } = await axios.post(`/users/forget-password`, { email });
  return data;
};
export const resetPassword = async (resetPasswordData: IResetPassword) => {
  const { data } = await axios.post(
    `/users/reset-password/${resetPasswordData.token}`,
    {
      newPassword: resetPasswordData.newPassword,
    }
  );
  return data;
};

export const verifyEmail = async (token: string) => {
  const data = await axios.get(`/users/verify-email/${token}`);
};
