import { ScriptMaster } from "./scriptMaster.model.js";


export async function insertIntoScriptMaster(values, options = { returning: true }) {
  const data = await ScriptMaster.create(values, options);
  return data?.dataValues;
}

export async function deleteScriptMasterByQuery(query) {
  const remove = await ScriptMaster.destroy(query);
  return remove;
}

export async function updateIntoScriptMaster(set, query = { where: {} }) {
  let [rows, data] = await ScriptMaster.update(set, query);
  return { rows_affected: rows, data };
}
