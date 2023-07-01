import { AccountMaster } from "./accountMaster.model.js";

export async function insertIntoAccountMaster(values, options = { returning: true }) {
  const data = await AccountMaster.create(values, options);
  return data?.dataValues;
}

export async function deleteAccountMasterByQuery(query) {
  const remove = await AccountMaster.destroy(query);
  return remove;
}

export async function updateIntoAccountMaster(set, query = { where: {} }) {
  let [rows, data] = await AccountMaster.update(set, query);
  return { rows_affected: rows, data };
}
