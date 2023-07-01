import { UserForms } from "./userForms.model.js";


export async function insertIntoUserForms(values, options = { returning: true }) {
  const data = await UserForms.create(values, options);
  return data?.dataValues;
}

export async function deleteUserFormsByQuery(query) {
  const remove = await UserForms.destroy(query);
  return remove;
}

export async function updateIntoUserForms(set, query = { where: {} }) {
  let [rows, data] = await UserForms.update(set, query);
  return { rows_affected: rows, data };
}
