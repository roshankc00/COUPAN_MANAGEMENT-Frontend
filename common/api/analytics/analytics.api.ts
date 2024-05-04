import axios from "../api";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getLast12MonthUsersAnalytics = async () => {
  const { data } = await axios.get(`/analytics/users`);
  return data;
};
export const getLast12MonthStoresAnalytics = async () => {
  const { data } = await axios.get(`/analytics/stores`);
  return data;
};
export const getLast12MonthCoponsAnalytics = async () => {
  const { data } = await axios.get(`/analytics/coupons`);
  return data;
};

export const getallCounts = async () => {
  const { data } = await axios.get(`/analytics/counts`);
  return data;
};
