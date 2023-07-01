import api from "../../utils/api-instance";

export const getAccountMasterData = async (id) => {
  return await api.get(`/user/accountMaster/selectQuery/${id}`);
};
export const insertAccountMasterData = async (data) => {
  return await api.post("/user/accountMaster/insertQuery", data);
};
export const deleteAccountMasterData = async (data) => {
  return await api.post("/user/accountMaster/deleteQuery", data);
};
export const updateAccountMasterData = async (data) => {
  return await api.patch("/user/accountMaster/updateQuery", data);
};

export const getAllAccountMasterData = async ()=>{
  return await api.get("/user/accountMaster/selectAllQuery")
}
