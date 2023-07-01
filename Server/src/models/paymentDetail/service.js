import { PaymentDetails } from "./paymentDetail.model.js";

export async function insertIntoPaymentDetails(
  values,
  options = { returning: true }
) {
  const data = await PaymentDetails.create(values, options);
  return data?.dataValues;
}

export async function deletePaymentDetailsByQuery(query) {
  const remove = await PaymentDetails.destroy(query);
  return remove;
}

export async function updateIntoPaymentDetails(set, query = { where: {} }) {
  let [rows, data] = await PaymentDetails.update(set, query);
  return { rows_affected: rows, data };
}
