import api from "../../utils/api-instance";

export const getAccountingYearData = async (id) => {
  return await api.get(`/user/accountingYear/selectQuery/${id}`);
};
export const insertAccountingYearData = async (data) => {
  return await api.post("/user/accountingYear/insertQuery", data);
};
export const deleteAccountingYearData = async (data) => {
  return await api.post("/user/accountingYear/deleteQuery", data);
};
export const updateAccountingYearData = async (data) => {
  return await api.patch("/user/accountingYear/updateQuery", data);
};

export const getAllAccountingYearData = async ()=>{
  return await api.get("/user/accountingYear/selectAllQuery")
}
