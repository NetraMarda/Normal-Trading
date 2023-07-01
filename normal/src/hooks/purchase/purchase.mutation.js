import { useMutation } from "@tanstack/react-query";

import {
  deletePurchaseData,
  updatePurchaseData,
} from "../../api/purchase/purchase.request";
import { insertPurchaseHeadDetail } from "../../api/purchase/purchase.request";

export const useInsertIntoPurchaseData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await insertPurchaseHeadDetail(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Inserted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert(
        "Purchase Insertion Failed 👎👎, Please Insert all the requried Fields."
      );
      console.log(error);
      return error;
    },
  });
};

export const useUpdateIntoPurchaseData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await updatePurchaseData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Updated Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Purchase Updation Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
export const useDeleteIntoPurchaseData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await deletePurchaseData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Deleted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Purchase Deletion Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
