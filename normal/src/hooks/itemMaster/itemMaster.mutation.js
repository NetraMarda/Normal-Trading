import { useMutation } from "@tanstack/react-query";
import {
 deleteItemMasterData,
 insertItemMasterData,
 updateItemMasterData
} from "../../api/itemMaster/itemMaster.request";

export const useInsertIntoItemMasterData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await insertItemMasterData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Inserted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("ItemMaster Insertion Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
export const useUpdateIntoItemMasterData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await updateItemMasterData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Updated Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("ItemMaster Updation Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
export const useDeleteIntoItemMasterData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await deleteItemMasterData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Deleted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("ItemMaster Deletion Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};