import { useQuery } from "@tanstack/react-query";
import {getAccountMasterData} from "../../api/accountMaster/accountMaster.request"

export const useSelectAccountMasterData = (id) => {
  return useQuery({
    enabled: id !== null,
    queryKey: ["AccountMaster", id],
    queryFn: async () => {
      const res = await getAccountMasterData(id);
      return res.data;
    },
    onSuccess: () => {
      //console.log(data);
    },
    onError: (error) => {
      console.log(error);
      return error;
    },
  });
};
