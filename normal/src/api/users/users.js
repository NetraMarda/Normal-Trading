import api from "../../utils/api-instance";

export const getUsersData = async (id) => {
    return await api.get(`/user/user/selectQuery/${id}`);
  };

export const getAllUsersData = async ()=>{
    return await api.get("/user/users/selectAllQuery")
  }