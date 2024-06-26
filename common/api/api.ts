import { store } from "@/store";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const getUserLoginStatus = () => {
  const { auth } = store.getState();
  return auth?.isLogedInStatus;
};

export const LogoutUser = () => {
  Cookies.remove("Authentication");
  localStorage.removeItem("persist:root");
  window.location.href = "/login";
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    Authorization: `Bearer ${Cookies.get("Authentication")}`,
  },
});

api.interceptors.request.use((req) => {
  const { auth } = store.getState();
  req.headers.Authorization = `Bearer ${auth?.token}`;
  return req;
});
api.interceptors.response.use(
  (res) => {
    if (res.status === 201) {
      new Promise((res) => setTimeout(res, 500));
    }
    return res;
  },
  (error) => {
    new Promise((res) => setTimeout(res, 300));
    if (error.config.method != "get") {
      if (error.response.status === 401) {
        toast.error(
          error.response.data.message ||
            "You are not authorized to perform the action!"
        );
        LogoutUser();
      } else {
        toast.error(error?.response?.data.message || "Something went wrong");
      }
    }
    return Promise.reject(error?.response?.data);
  }
);
export default api;
