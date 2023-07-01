import { PaymentHead } from "./paymentHead.model.js";

export async function insertIntoPaymentHead(
  values,
  options = { returning: true }
) {
  const data = await PaymentHead.create(values, options);
  return data?.dataValues;
}

export async function deletePaymentHeadByQuery(query) {
  const remove = await PaymentHead.destroy(query);
  return remove;
}

export async function updateIntoPaymentHead(set, query = { where: {} }) {
  let [rows, data] = await PaymentHead.update(set, query);
  return { rows_affected: rows, data };
}
