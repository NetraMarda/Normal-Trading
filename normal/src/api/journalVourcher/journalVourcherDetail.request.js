import api from "../../utils/api-instance";

export const getJournalVourcherDetailData = async (id) => {
  return await api.get(`/user/transactionDetail/selectQuery/${id}`);
};
export const insertJournalVourcherDetailData = async (data) => {
  return await api.post("/user/transactionDetail/insertQuery", data);
};
export const deleteJournalVourcherDetailData = async (data) => {
  return await api.post("/user/transactionDetail/deleteQuery", data);
};
export const updateJournalVourcherDetailData = async (data) => {
  return await api.patch("/user/transactionDetail/updateQuery", data);
};

export const getAllJournalVourcherDetailData = async ()=>{
  return await api.get("/user/transactionDetail/selectAllQuery")
}