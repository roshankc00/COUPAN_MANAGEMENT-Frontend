import axios from "../api";

export const getAllCoupons = async () => {
  const { data } = await axios.get(`/coupons`);
  return data;
};

export const getAllCouponsOfCategoryAndSubcategory = async (
  categoryId: number,
  subCategoryIds: number[],
  page: number,
  pageSize: number
) => {
  const { data } = await axios.get(
    `/coupons?categoryId=${categoryId}&subCategoryIds=${subCategoryIds}&page=${page}&pageSize=${pageSize}`
  );
  return data;
};

export const getAllCouponsOfStore = async (storeId: number) => {
  const { data } = await axios.get(`/coupons?stroreId=${storeId}`);
  return data;
};
