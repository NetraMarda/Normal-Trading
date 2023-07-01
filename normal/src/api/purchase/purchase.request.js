import api from "../../utils/api-instance";

export const getPurchaseData = async (id) => {
  return await api.get(`/user/purchaseHead/selectQuery/${id}`);
};
export const insertPurchaseData = async (data) => {
  return await api.post("/user/purchaseHead/insertQuery", data);
};
export const deletePurchaseData = async (data) => {
  return await api.post("/user/purchaseHead/deleteQuery", data);
};
export const updatePurchaseData = async (data) => {
  return await api.patch("/user/purchaseHead/updateQuery", data);
};

export const getAllPurchaseData = async ()=>{
  return await api.get("/user/purchaseHead/selectAllQuery")
}

export const insertPurchaseHeadDetail = async(data)=>{
  return await api.post("/user/purchasehead-detail/insert",data)
}