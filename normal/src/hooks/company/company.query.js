import { useQuery } from "@tanstack/react-query";
import { getCompanyData } from "../../api/company/company.request";

export const useSelectCompanyData = (id) => {
  return useQuery({
    enabled: id !== null,
    queryKey: ["company", id],
    queryFn: async () => {
      const res = await getCompanyData(id);
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
