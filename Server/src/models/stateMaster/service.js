import { StateMaster } from "./stateMaster.model.js";


export async function insertIntoStateMaster(values, options = { returning: true }) {
  const data = await StateMaster.create(values, options);
  return data?.dataValues;
}

export async function deleteStateMasterByQuery(query) {
  const remove = await StateMaster.destroy(query);
  return remove;
}

export async function updateIntoStateMaster(set, query = { where: {} }) {
  let [rows, data] = await StateMaster.update(set, query);
  return { rows_affected: rows, data };
}
