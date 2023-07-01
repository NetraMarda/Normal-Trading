import { object, string, number } from "yup";

let companySchema = object({
  companyName: string().required(),
  city: string().required(),
  state: string().required(),
  mobile: string().nullable().min(10).max(10),
  gstNo: string().nullable().max(15),
  panNo: string().nullable().max(10),
  createdBy: number().required(),
  modifiedBy: number().nullable(),
  fssiNo: string().nullable(),
  signPath: string().nullable().url(),
  logoPath: string().nullable().url(),
  stateCode: string().required(),
});
