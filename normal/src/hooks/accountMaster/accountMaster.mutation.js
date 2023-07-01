import { useMutation } from "@tanstack/react-query";
import { deleteAccountMasterData, insertAccountMasterData, updateAccountMasterData } from "../../api/accountMaster/accountMaster.request";

export const useInsertIntoAccountMasterData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await insertAccountMasterData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Inserted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("AccountMaster Insertion Failed 👎👎, Please Insert all the requried Fields.");
      console.log(error);
      return error;
    },
  });
};
export const useUpdateIntoAccountMasterData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await updateAccountMasterData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Updated Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("AccountMaster Updation Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
export const useDeleteIntoAccountMasterData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await deleteAccountMasterData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Deleted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("AccountMaster Deletion Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
