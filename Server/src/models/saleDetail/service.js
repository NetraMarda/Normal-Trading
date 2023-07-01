import { SaleDetail } from "./saleDetail.model.js";

export async function insertIntoSaleDetail(values, options = { returning: true }) {
    const data = await SaleDetail.create(values, options);
    return data?.dataValues;
  }

  export async function deleteSaleDetailByQuery(query) {
    const remove = await SaleDetail.destroy(query);
    return remove;
  }

  export async function updateIntoSaleDetail(set, query = { where: {} }) {
    let [rows, data] = await SaleDetail.update(set, query);
    return { rows_affected: rows, data };
  }
  