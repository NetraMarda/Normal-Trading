import { Users } from "./users.model.js";


export async function insertIntoUsers(values, options = { returning: true }) {
  const data = await Users.create(values, options);
  return data?.dataValues;
}

export async function deleteUsersByQuery(query) {
  const remove = await Users.destroy(query);
  return remove;
}

export async function updateIntoUsers(set, query = { where: {} }) {
  let [rows, data] = await Users.update(set, query);
  return { rows_affected: rows, data };
}
