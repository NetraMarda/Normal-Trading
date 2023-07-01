import { ExpiryMaster } from "./expiryMaster.model.js";

export async function insertIntoExpiryMaster(
  values,
  options = { returning: true }
) {
  const data = await ExpiryMaster.create(values, options);
  return data?.dataValues;
}

export async function deleteExpiryMasterByQuery(query) {
  const remove = await ExpiryMaster.destroy(query);
  return remove;
}

export async function updateIntoExpiryMaster(set,query = {where : {}}){
  let[rows,data] = await ExpiryMaster.update(set,query);
  return {rows_affected:rows, data};
}
