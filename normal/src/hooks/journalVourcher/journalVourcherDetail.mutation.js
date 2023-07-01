import { useMutation } from "@tanstack/react-query";
import { deleteJournalVourcherDetailData, insertJournalVourcherDetailData, updateJournalVourcherDetailData } from "../../api/journalVourcher/journalVourcherDetail.request";

export const useInsertIntoJournalVourcherDetailData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await insertJournalVourcherDetailData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Inserted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Journal Vourcher Detail Insertion Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
export const useUpdateIntoJournalVourcherDetailData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await updateJournalVourcherDetailData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Updated Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Journal Vourcher Detail Updation Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
export const useDeleteIntoJournalVourcherDetailData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await deleteJournalVourcherDetailData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Deleted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Journal Vourcher Detail Deletion Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
