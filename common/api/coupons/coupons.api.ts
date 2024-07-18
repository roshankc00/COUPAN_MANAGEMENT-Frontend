import { ICouponBody } from "@/interfaces/coupon.interface";
import axios from "../api";

export const getAllCoupons = async () => {
  const { data } = await axios.get(`/coupons`);
  return data;
};

export const getAllCouponsOfCategoryAndSubcategory = async (
  categorySlug: string,
  subCategoryIds: number[],
  page: number,
  pageSize: number
) => {
  if (subCategoryIds && subCategoryIds?.length > 0) {
    const { data } = await axios.get(
      `/coupons?categorySlug=${categorySlug}&subCategoryIds=${subCategoryIds}&page=${page}&pageSize=${pageSize}`
    );
    return data;
  } else {
    const { data } = await axios.get(
      `/coupons?categorySlug=${categorySlug}&page=${page}&pageSize=${pageSize}`
    );
    return data;
  }
};

export const getAllCouponsOfStore = async (
  storeSlug: string,
  page: number,
  pageSize: number
) => {
  const { data } = await axios.get(
    `/coupons?storeSlug=${storeSlug}&page=${page}&pageSize=${pageSize}`
  );
  return data;
};

export const getAllUserWishlistCoupons = async (status: string) => {
  const { data } = await axios.get(`/wishlists/my?status=${status}`);
  return data;
};

export const getAllCouponsOfCategoryAndStore = async (
  storeIds: number[],
  page: number,
  pageSize: number
) => {
  if (storeIds && storeIds.length > 0) {
    const { data } = await axios.get(
      `/coupons?storeIds=${storeIds}&page=${page}&pageSize=${pageSize}`
    );
    return data;
  } else {
    const { data } = await axios.get(
      `/coupons?page=${page}&pageSize=${pageSize}`
    );
    return data;
  }
};

export const postCoupon = async (body: ICouponBody) => {
  const { data } = await axios.post("/coupons", body);
  return data;
};

export const updateCoupon = async (body: { id: number; values: any }) => {
  const { data } = await axios.patch(`/coupons/${body.id}`, body.values);
  return data;
};

export const getSingleCoupon = async (id: number) => {
  const { data } = await axios.get(`/coupons/${id}`);
  return data;
};

export const deleteCoupon = async (id: number) => {
  const { data } = await axios.delete(`/coupons/${id}`);
  return data;
};

export const existInWatchList = async (couponId: number) => {
  const { data } = await axios.get(
    `/wishlists/coupon/exist?couponId=${couponId}`
  );
  return data;
};
export const addRemoveInWatchList = async (couponId: number) => {
  const { data } = await axios.post(`/wishlists/add-remove`, { couponId });
  return data;
};

export const getLatestCoupons = async () => {
  const { data } = await axios.get(`/coupons/featured/coupons?no=20`);
  return data;
};
