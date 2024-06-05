import axios from "../api";

export interface IPaymentBody {
  amount: number;
  remark: string;
}

export const postPayment = async (body: IPaymentBody) => {
  const { data } = await axios.post(`/payment-solution`, body);
  return data;
};
