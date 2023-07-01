import api from "../../utils/api-instance";

export const getPaymentDetailData = async (id) => {
  return await api.get(`/user/paymentDetail/selectQuery/${id}`);
};
export const insertPaymentDetailData = async (data) => {
  return await api.post("/user/paymentDetail/insertQuery", data);
};
export const deletePaymentDetailData = async (data) => {
  return await api.post("/user/paymentDetail/deleteQuery", data);
};
export const updatePaymentDetailData = async (data) => {
  return await api.patch("/user/paymentDetail/updateQuery", data);
};

export const getAllPaymentDetailData = async ()=>{
  return await api.get("/user/paymentDetail/selectAllQuery")
}