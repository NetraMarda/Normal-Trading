import api from "../../utils/api-instance";

export const getPurchaseDetailData = async (id) => {
  return await api.get(`/user/purchaseDetail/selectQuery/${id}`);
};
export const insertPurchaseDetailData = async (data) => {
  return await api.post("/user/purchaseDetail/insertQuery", data);
};
export const deletePurchaseDetailData = async (data) => {
  return await api.post("/user/purchaseDetail/deleteQuery", data);
};
export const updatePurchaseDetailData = async (data) => {
  return await api.patch("/user/purchaseDetail/updateQuery", data);
};

export const getAllPurchaseDetailData = async ()=>{
  return await api.get("/user/purchaseDetail/selectAllQuery")
}