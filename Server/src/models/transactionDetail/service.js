import { TransactionDetails } from "./transactionDetail.model.js";

export async function insertIntoTransactionDetails(
  values,
  options = { returning: true }
) {
  const data = await TransactionDetails.create(values, options);
  return data?.dataValues;
}

export async function deleteTransactionDetailsByQuery(query) {
  const remove = await TransactionDetails.destroy(query);
  return remove;
}

export async function updateIntoTransactionDetails(set, query = { where: {} }) {
  let [rows, data] = await TransactionDetails.update(set, query);
  return { rows_affected: rows, data };
}
