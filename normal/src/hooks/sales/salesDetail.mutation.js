import { useMutation } from "@tanstack/react-query";
import { deleteSalesDetailData, insertSalesDetailData, updateSalesDetailData } from "../../api/sales/salesDetail.request";

export const useInsertIntoSalesDetailData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await insertSalesDetailData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Inserted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert(
        "Sales Detail Insertion Failed 👎👎, Please Insert all the requried Fields."
      );
      console.log(error);
      return error;
    },
  });
};
export const useUpdateIntoSalesDetailData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await updateSalesDetailData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Updated Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Sales Detail Updation Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
export const useDeleteIntoSalesDetailData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await deleteSalesDetailData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Deleted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Sales Detail Deletion Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
