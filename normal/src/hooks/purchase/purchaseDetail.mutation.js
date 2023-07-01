import { useMutation } from "@tanstack/react-query";
import {
  deletePurchaseDetailData,
  insertPurchaseDetailData,
  updatePurchaseDetailData,
} from "../../api/purchase/purchaseDetail.request";

export const useInsertIntoPurchaseDetailData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await insertPurchaseDetailData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Inserted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert(
        "Purchase Detail Insertion Failed 👎👎, Please Insert all the requried Fields."
      );
      console.log(error);
      return error;
    },
  });
};
export const useUpdateIntoPurchaseDetailData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await updatePurchaseDetailData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Updated Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Purchase Detail Updation Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
export const useDeleteIntoPurchaseDetailData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await deletePurchaseDetailData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Deleted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Purchase Detail Deletion Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
