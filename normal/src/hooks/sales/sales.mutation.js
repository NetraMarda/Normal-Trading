import { useMutation } from "@tanstack/react-query";
import { deleteSalesData, insertSalesData, updateSalesData } from "../../api/sales/sales.request";


export const useInsertIntoSalesData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await insertSalesData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Inserted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Sales Insertion Failed 👎👎, Please Insert all the requried Fields.");
      console.log(error);
      return error;
    },
  });
};
export const useUpdateIntoSalesData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await updateSalesData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Updated Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Sales Updation Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
export const useDeleteIntoSalesData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await deleteSalesData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Deleted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Sales Deletion Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
