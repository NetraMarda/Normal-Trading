import { AccountingYear } from "./accountingYear.model.js";

export async function insertIntoAccountingYear(
  values,
  options = { returning: true }
) {
  const data = await AccountingYear.create(values, options);
  return data?.dataValues;
}

export async function deleteAccountingYearByQuery(query) {
  const remove = await AccountingYear.destroy(query);
  return remove;
}

export async function updateIntoAccountingYear(set, query = { where: {} }) {
  let [rows, data] = await AccountingYear.update(set, query);
  return { rows_affected: rows, data };
}
