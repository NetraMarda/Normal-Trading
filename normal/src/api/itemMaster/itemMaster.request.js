import api from "../../utils/api-instance";

export const getItemMasterData = async (id) => {
  return await api.get(`/user/itemMaster/selectQuery/${id}`);
};
export const insertItemMasterData = async (data) => {
  return await api.post("/user/itemMaster/insertQuery", data);
};
export const deleteItemMasterData = async (data) => {
  return await api.post("/user/itemMaster/deleteQuery", data);
};
export const updateItemMasterData = async (data) => {
  return await api.patch("/user/itemMaster/updateQuery", data);
};

export const getAllItemMasterData = async ()=>{
  return await api.get("/user/itemMaster/selectAllQuery")
}