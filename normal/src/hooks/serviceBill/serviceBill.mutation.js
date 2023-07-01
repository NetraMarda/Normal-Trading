import { useMutation } from "@tanstack/react-query";
import { deleteServiceBillData, insertServiceBillData, updateServiceBillData } from "../../api/serviceBill/serviceBill.request";


export const useInsertIntoServiceBillData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await insertServiceBillData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Inserted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Service Bill Insertion Failed 👎👎, Please Insert all the requried Fields.");
      console.log(error);
      return error;
    },
  });
};
export const useUpdateIntoServiceBillData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await updateServiceBillData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Updated Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Service Bill Updation Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
export const useDeleteIntoServiceBillData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await deleteServiceBillData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Deleted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Service Bill Deletion Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
