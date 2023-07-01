import { useMutation } from "@tanstack/react-query";
import { deletePaymentHeadData, insertPaymentHeadData, updatePaymentHeadData } from "../../api/payment/paymentHead.request";

export const useInsertIntoPaymentHeadData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await insertPaymentHeadData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Inserted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Recipt/Payment Insertion Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
export const useUpdateIntoPaymentHeadData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await updatePaymentHeadData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Updated Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Recipt/Payment Updation Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
export const useDeleteIntoPaymentHeadData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await deletePaymentHeadData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Deleted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Recipt/Payment Deletion Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
