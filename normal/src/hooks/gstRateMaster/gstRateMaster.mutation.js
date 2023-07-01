import { useMutation } from "@tanstack/react-query";
import {
  insertGstRateMasterData,
  updateGstRateMasterData,
  deleteGstRateMasterData,
} from "../../api/gstRateMaster/gstRateMaster.request";

export const useInsertIntoGstRateMasterData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await insertGstRateMasterData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Inserted Sucessfully");
    },
    onError: (error) => {
      alert("GstRateMaster Insertion Failed");
      console.log(error);
      return error;
    },
  });
};

export const useUpdateIntoGstRateMasterData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await updateGstRateMasterData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Updated Sucessfully");
    },
    onError: (error) => {
      alert("GstRateMaster Updation Failed");
      console.log(error);
      return error;
    },
  });
};

export const useDeleteIntoGstRateMasterData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await deleteGstRateMasterData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Deleted Sucessfully");
    },
    onError: (error) => {
      alert("GstRateMaster Deletion Failed");
      console.log(error);
      return error;
    },
  });
};