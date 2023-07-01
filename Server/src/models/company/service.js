import { Company } from "./company.model.js";

export async function insertIntoCompany(values, options = { returning: true }) {
  const data = await Company.create(values, options);
  return data?.dataValues;
}

export async function deleteCompanyByQuery(query) {
  const remove = await Company.destroy(query);
  return remove;
}

export async function updateIntoCompany(set, query = { where: {} }) {
  let [rows, data] = await Company.update(set, query);
  return { rows_affected: rows, data };
}
