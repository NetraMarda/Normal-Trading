import { useMutation } from "@tanstack/react-query";
import { deletePaymentDetailData, insertPaymentDetailData, updatePaymentDetailData } from "../../api/payment/paymentDetail.request";

export const useInsertIntoPaymentDetailData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await insertPaymentDetailData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Inserted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Payment Detail Insertion Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
export const useUpdateIntoPaymentDetailData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await updatePaymentDetailData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Updated Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Payment Detail Updation Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
export const useDeleteIntoPaymentDetailData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await deletePaymentDetailData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Deleted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Payment Detail Deletion Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
