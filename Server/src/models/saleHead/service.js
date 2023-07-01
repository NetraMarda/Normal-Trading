import { SaleHead } from "./saleHead.model.js";

export async function insertIntoSaleHead(values, options = { returning: true }) {
    const data = await SaleHead.create(values, options);
    return data?.dataValues;
  }

  export async function deleteSaleHeadByQuery(query) {
    const remove = await SaleHead.destroy(query);
    return remove;
  }

  export async function updateIntoSaleHead(set, query = { where: {} }) {
    let [rows, data] = await SaleHead.update(set, query);
    return { rows_affected: rows, data };
  }
  