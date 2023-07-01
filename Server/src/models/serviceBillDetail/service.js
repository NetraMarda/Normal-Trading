import { ServiceBillDetail } from "./serviceBillDetail.model.js";

export async function insertIntoServiceBillDetail(
  values,
  options = { returning: true }
) {
  const data = await ServiceBillDetail.create(values, options);
  return data?.dataValues;
}

export async function deleteServiceBillDetailByQuery(query) {
  const remove = await ServiceBillDetail.destroy(query);
  return remove;
}

export async function updateIntoServiceBillDetail(set, query = { where: {} }) {
  let [rows, data] = await ServiceBillDetail.update(set, query);
  return { rows_affected: rows, data };
}
