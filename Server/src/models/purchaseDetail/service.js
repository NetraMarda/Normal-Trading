import { PurchaseDetail } from "./purchaseDetail.model.js";

export async function insertIntoPurchaseDetail(
  values,
  options = { returning: true }
) {
  const data = await PurchaseDetail.create(values, options);
  return data?.dataValues;
}

export async function deletePurchaseDetailByQuery(query) {
  const remove = await PurchaseDetail.destroy(query);
  return remove;
}

export async function updateIntoPurchaseDetail(set, query = { where: {} }) {
  let [rows, data] = await PurchaseDetail.update(set, query);
  return { rows_affected: rows, data };
}
