import api from "../../utils/api-instance";

export const getJournalVourcherHeadData = async (id) => {
  return await api.get(`/user/transactionHead/selectQuery/${id}`);
};
export const insertJournalVourcherHeadData = async (data) => {
  return await api.post("/user/transactionHead/insertQuery", data);
};
export const deleteJournalVourcherHeadData = async (data) => {
  return await api.post("/user/transactionHead/deleteQuery", data);
};
export const updateJournalVourcherHeadData = async (data) => {
  return await api.patch("/user/transactionHead/updateQuery", data);
};

export const getAllJournalVourcherHeadData = async ()=>{
  return await api.get("/user/transactionHead/selectAllQuery")
}