import { TransactionHead } from "./transactionHead.model.js";

export async function insertIntoTransactionHead(
  values,
  options = { returning: true }
) {
  const data = await TransactionHead.create(values, options);
  return data?.dataValues;
}

export async function deleteTransactionHeadByQuery(query) {
  const remove = await TransactionHead.destroy(query);
  return remove;
}

export async function updateIntoTransactionHead(set, query = { where: {} }) {
  let [rows, data] = await TransactionHead.update(set, query);
  return { rows_affected: rows, data };
}
