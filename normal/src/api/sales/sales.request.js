import api from "../../utils/api-instance";

export const getSalesData = async (id) => {
  return await api.get(`/user/salesHead/selectQuery/${id}`);
};
export const insertSalesData = async (data) => {
  return await api.post("/user/salesHead/insertQuery", data);
};
export const deleteSalesData = async (data) => {
  return await api.post("/user/salesHead/deleteQuery", data);
};
export const updateSalesData = async (data) => {
  return await api.patch("/user/salesHead/updateQuery", data);
};

export const getAllSalesData = async ()=>{
  return await api.get("/user/salesHead/selectAllQuery")
}
