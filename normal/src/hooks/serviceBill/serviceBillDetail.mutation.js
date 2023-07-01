import { useMutation } from "@tanstack/react-query";
import { deleteServiceBillDetailData, insertServiceBillDetailData, updateServiceBillDetailData } from "../../api/serviceBill/serviceBillDetail.request";


export const useInsertIntoServiceBillDetailData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await insertServiceBillDetailData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Inserted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Service Detail Insertion Failed 👎👎, Please Insert all the requried Fields.");
      console.log(error);
      return error;
    },
  });
};
export const useUpdateIntoServiceBillDetailData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await updateServiceBillDetailData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Updated Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Service Detail Updation Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
export const useDeleteIntoServiceBillDetailData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await deleteServiceBillDetailData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Deleted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Service Detail Deletion Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
