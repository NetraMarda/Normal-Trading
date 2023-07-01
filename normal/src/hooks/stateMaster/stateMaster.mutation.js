import { useMutation } from "@tanstack/react-query";
import {
  insertStateMasterData,
  updateStateMasterData,
  deleteStateMasterData,
} from "../../api/stateMaster/stateMaster.request";

export const useInsertIntoStateMasterData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await insertStateMasterData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Inserted Sucessfully");
    },
    onError: (error) => {
      alert("StateMaster Insertion Failed");
      console.log(error);
      return error;
    },
  });
};

export const useUpdateIntoStateMasterData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await updateStateMasterData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Updated Sucessfully");
    },
    onError: (error) => {
      alert("StatetMaster Updation Failed");
      console.log(error);
      return error;
    },
  });
};

export const useDeleteIntoStateMasterData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await deleteStateMasterData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Deleted Sucessfully");
    },
    onError: (error) => {
      alert("StateMaster Deletion Failed");
      console.log(error);
      return error;
    },
  });
};