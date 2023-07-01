import { GLedger } from "./gledger.model.js";

export async function insertIntoGLedger(values, options = { returning: true }) {
    const data = await GLedger.create(values, options);
    return data?.dataValues;
  }

  export async function deleteGLedgerByQuery(query) {
    const remove = await GLedger.destroy(query);
    return remove;
  }

  export async function updateIntoGLedger(set, query = { where: {} }) {
    let [rows, data] = await GLedger.update(set, query);
    return { rows_affected: rows, data };
  }
  