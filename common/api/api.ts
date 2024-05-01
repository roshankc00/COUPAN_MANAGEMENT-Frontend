import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    Authorization: `Bearer ${Cookies.get("Authentication")}`,
  },
});

api.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${Cookies.get("Authentication")}`;
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
    if (
      error.response.method === "post" ||
      error.response.method === "put" ||
      error.response.method === "delete"
    ) {
      if (error.response.status === 401) {
        toast.error(
          error.response.data.message ||
            "You are not authorized to perform the action!"
        );
        window.location.href = "/login";
        Cookies.remove("Authentication");
      } else {
        toast.error(
          error.reponse.data.message || "Somehow request failed, Contact Admin"
        );
      }
    }

    return Promise.reject(error?.response?.data);
  }
);
export default api;
