import { GroupMaster } from "./groupMaster.model.js";


export async function insertIntoGroupMaster(values, options = { returning: true }) {
  const data = await GroupMaster.create(values, options);
  return data?.dataValues;
}

export async function deleteGroupMasterByQuery(query) {
  const remove = await GroupMaster.destroy(query);
  return remove;
}

export async function updateIntoGroupMaster(set, query = { where: {} }) {
  let [rows, data] = await GroupMaster.update(set, query);
  return { rows_affected: rows, data };
}
