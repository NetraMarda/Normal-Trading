import api from "../../utils/api-instance";

export const getServiceBillData = async (id) => {
  return await api.get(`/user/serviceBillHead/selectQuery/${id}`);
};
export const insertServiceBillData = async (data) => {
  return await api.post("/user/serviceBillHead/insertQuery", data);
};
export const deleteServiceBillData = async (data) => {
  return await api.post("/user/serviceBillHead/deleteQuery", data);
};
export const updateServiceBillData = async (data) => {
  return await api.patch("/user/serviceBillHead/updateQuery", data);
};

export const getAllServiceBillData = async ()=>{
  return await api.get("/user/serviceBillHead/selectAllQuery")
}
