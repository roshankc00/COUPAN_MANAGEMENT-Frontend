interface ReviewFormData {
  title: string;
  description: string;
  thumbnail: File;
  items: {
    title: string;
    description: string;
    image?: File;
    isImage: boolean;
  }[];
}
import axios from "../api";
export const postReview = async (body: any) => {
  const { data } = await axios.post(`/reviews`, body);
  return data;
};
export const getAllReviews = async (
  page: number,
  pageSize: number,
  couponId: number,
  rating: number | null,
  searchText: string | null
) => {
  let url = `/review?page=${page}&pageSize=${pageSize}&couponId=${couponId}`;

  if (rating !== null && rating !== 0) {
    url += `&rating=${rating}`;
  }
  if (searchText !== null && searchText !== "") {
    url += `&searchText=${encodeURIComponent(searchText)}`;
  }

  const { data } = await axios.get(`${url}`);
  return data;
};

export const getSingleReview = async (id: number) => {
  const { data } = await axios.get(`/review/${id}`);
  return data;
};

export const updateReview = async (body: { id: number; values: any }) => {
  const { data } = await axios.patch(`/review/${body.id}`, body.values);
  return data;
};

export const deleteStore = async (id: number) => {
  const { data } = await axios.delete(`/review/${id}`);
  return data;
};

export const getReviewStatus = async (id: number) => {
  const { data } = await axios.get(`/review/rating/number?couponId=${id}`);
  return data;
};
