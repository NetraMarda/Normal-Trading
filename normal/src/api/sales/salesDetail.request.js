import api from "../../utils/api-instance";

export const getSalesDetailData = async (id) => {
  return await api.get(`/user/salesDetail/selectQuery/${id}`);
};
export const insertSalesDetailData = async (data) => {
  return await api.post("/user/salesDetail/insertQuery", data);
};
export const deleteSalesDetailData = async (data) => {
  return await api.post("/user/salesDetail/deleteQuery", data);
};
export const updateSalesDetailData = async (data) => {
  return await api.patch("/user/salesDetail/updateQuery", data);
};

export const getAllSalesDetailData = async ()=>{
  return await api.get("/user/salesDetail/selectAllQuery")
}