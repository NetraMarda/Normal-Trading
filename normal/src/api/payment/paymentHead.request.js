import api from "../../utils/api-instance";

export const getPaymentHeadData = async (id) => {
  return await api.get(`/user/paymentHead/selectQuery/${id}`);
};
export const insertPaymentHeadData = async (data) => {
  return await api.post("/user/paymentHead/insertQuery", data);
};
export const deletePaymentHeadData = async (data) => {
  return await api.post("/user/paymentHead/deleteQuery", data);
};
export const updatePaymentHeadData = async (data) => {
  return await api.patch("/user/paymentHead/updateQuery", data);
};

export const getAllPaymentHeadData = async ()=>{
  return await api.get("/user/paymentHead/selectAllQuery")
}