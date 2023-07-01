import api from "../../utils/api-instance";

export const getCompanyData = async (id) => {
  return await api.get(`/user/company/selectQuery/${id}`);
};
export const insertCompanyData = async (data) => {
  return await api.post("/user/company/insertQuery", data);
};
export const deleteCompanyData = async (data) => {
  return await api.post("/user/company/deleteQuery", data);
};
export const updateCompanyData = async (data) => {
  return await api.patch("/user/company/updateQuery", data);
};

export const getAllCompanyData = async ()=>{
  return await api.get("/user/company/selectAllQuery")
}
