import api from "../../utils/api-instance";

export const getServiceBillDetailData = async (id) => {
  return await api.get(`/user/serviceBillDetail/selectQuery/${id}`);
};
export const insertServiceBillDetailData = async (data) => {
  return await api.post("/user/serviceBillDetail/insertQuery", data);
};
export const deleteServiceBillDetailData = async (data) => {
  return await api.post("/user/serviceBillDetail/deleteQuery", data);
};
export const updateServiceBillDetailData = async (data) => {
  return await api.patch("/user/serviceBillDetail/updateQuery", data);
};

export const getAllServiceBillDetailData = async ()=>{
  return await api.get("/user/serviceBillDetail/selectAllQuery")
}
