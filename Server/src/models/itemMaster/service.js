import { ItemMaster } from "./itemMaster.model.js";


export async function insertIntoItemMaster(values, options = { returning: true }) {
  const data = await ItemMaster.create(values, options);
  return data?.dataValues;
}

export async function deleteItemMasterByQuery(query) {
  const remove = await ItemMaster.destroy(query);
  return remove;
}

export async function updateIntoItemMaster(set, query = { where: {} }) {
  let [rows, data] = await ItemMaster.update(set, query);
  return { rows_affected: rows, data };
}
