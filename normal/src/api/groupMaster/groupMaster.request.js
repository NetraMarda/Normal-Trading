import api from "../../utils/api-instance";

export const getGroupMasterData = async (id) => {
  return await api.get(`/user/groupMaster/selectQuery/${id}`);
};
export const insertGroupMasterData = async (data) => {
  return await api.post("/user/groupMaster/insertQuery", data);
};
export const deleteGroupMasterData = async (data) => {
  return await api.post("/user/Master/deleteQuery", data);
};
export const updateGroupMasterData = async (data) => {
  return await api.patch("/user/groupMaster/updateQuery", data);
};

export const getAllGroupMasterData = async ()=>{
  return await api.get("/user/groupMaster/selectAllQuery")
}
