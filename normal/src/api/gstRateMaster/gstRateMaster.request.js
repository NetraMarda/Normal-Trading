import api from "../../utils/api-instance";

export const getGstRateMasterData = async (id) => {
  return await api.get(`/user/gstRateMaster/selectQuery/${id}`);
};
export const insertGstRateMasterData = async (data) => {
  return await api.post("/user/gstRateMaster/insertQuery", data);
};
export const deleteGstRateMasterData = async (data) => {
  return await api.post("/user/gstRateMaster/deleteQuery", data);
};
export const updateGstRateMasterData = async (data) => {
  return await api.patch("/user/gstRateMaster/updateQuery", data);
};

export const getAllGstRateMasterData = async ()=>{
  return await api.get("/user/gstRateMaster/selectAllQuery")
}
