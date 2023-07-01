import { useMutation } from "@tanstack/react-query";
import {
  insertGroupMasterData,
  updateGroupMasterData,
  deleteGroupMasterData,
} from "../../api/groupMaster/groupMaster.request";

export const useInsertIntoGroupMasterData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await insertGroupMasterData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Inserted Sucessfully");
    },
    onError: (error) => {
      alert("GroupMaster Insertion Failed");
      console.log(error);
      return error;
    },
  });
};

export const useUpdateIntoGroupMasterData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await updateGroupMasterData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Updated Sucessfully");
    },
    onError: (error) => {
      alert("GroupMaster Updation Failed");
      console.log(error);
      return error;
    },
  });
};

export const useDeleteIntoGroupMasterData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await deleteGroupMasterData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Deleted Sucessfully");
    },
    onError: (error) => {
      alert("GroupMaster Deletion Failed");
      console.log(error);
      return error;
    },
  });
};