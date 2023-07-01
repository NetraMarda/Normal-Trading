import api from "../../utils/api-instance";

export const getStateMasterData = async (id) => {
  return await api.get(`/user/stateMaster/selectQuery/${id}`);
};
export const insertStateMasterData = async (data) => {
  return await api.post("/user/stateMaster/insertQuery", data)
};
export const deleteStateMasterData = async (data) => {
  return await api.post("/user/stateMaster/deleteQuery", data);
};
export const updateStateMasterData = async (data) => {
  return await api.patch("/user/stateMaster/updateQuery", data);
};

export const getAllStateMasterData = async ()=>{
  return await api.get("/user/stateMaster/selectAllQuery")
}
