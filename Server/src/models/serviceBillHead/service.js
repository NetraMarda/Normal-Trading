import { ServiceBillHead } from "./serviceBillHead.model.js";

export async function insertIntoServiceBill(
  values,
  options = { returning: true }
) {
  const data = await ServiceBillHead.create(values, options);
  return data?.dataValues;
}

export async function deleteServiceBillByQuery(query) {
  const remove = await ServiceBillHead.destroy(query);
  return remove;
}

export async function updateIntoServiceBill(set, query = { where: {} }) {
  let [rows, data] = await ServiceBillHead.update(set, query);
  return { rows_affected: rows, data };
}
