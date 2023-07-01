import { Details } from "./details.model.js";

export async function insertIntoDetailsByQuery(
  values,
  options = { returning: true }
) {
  const data = await Details.create(values, options);
  return data?.dataValues;
}

export async function updateDetailsByQuery(set, query = { where: {} }) {
  let [rows, data] = await Details.update(set, query);
  return { rows_affected: rows, data };
}

export async function deleteDetailsByQuery(query) {
  const remove = await Details.destroy(query);
  return remove;
}
