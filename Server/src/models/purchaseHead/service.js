import { PurchaseHead } from "./purchaseHead.model.js";

export async function insertIntoPurchaseHead(values, options = { returning: true }) {
    const data = await PurchaseHead.create(values, options);
    return data?.dataValues;
  }

  export async function deletePurchaseHeadByQuery(query) {
    const remove = await PurchaseHead.destroy(query);
    return remove;
  }

  export async function updateIntoPurchaseHead(set, query = { where: {} }) {
    let [rows, data] = await PurchaseHead.update(set, query);
    return { rows_affected: rows, data };
  }
  