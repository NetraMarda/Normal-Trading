import { useMutation } from "@tanstack/react-query";
import { deleteJournalVourcherHeadData, insertJournalVourcherHeadData, updateJournalVourcherHeadData } from "../../api/journalVourcher/journalVourcherHead.request";
// import { transactionDocNo } from "../../api/docno/docno.request";

export const useInsertIntoJournalVourcherHeadData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await insertJournalVourcherHeadData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Inserted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Journal Vourcher Insertion Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
export const useUpdateIntoJournalVourcherHeadData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await updateJournalVourcherHeadData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Updated Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Journal Vourcher Updation Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};
export const useDeleteIntoJournalVourcherHeadData = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await deleteJournalVourcherHeadData(data);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Deleted Sucessfully 👍👍");
    },
    onError: (error) => {
      alert("Journal Vourcher Deletion Failed 👎👎");
      console.log(error);
      return error;
    },
  });
};

// export const useTransactionData = () => {
//   return useMutation({
//     mutationFn: async (data) => {
//       console.log(data)
//       const res = await transactionDocNo(data);
//       return res;
//     },
//     // onSuccess: (data) => {
//     //   console.log(data);
//     //   alert("Inserted Sucessfully 👍👍");
//     // },
//     // onError: (error) => {
//     //   alert("Journal Vourcher Insertion Failed 👎👎");
//     //   console.log(error);
//     //   return error;
//     // },
//   });
// };
