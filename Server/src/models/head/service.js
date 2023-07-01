import { Head } from "./head.model.js";

export async function insertIntoHead(values, options = { returning: true }) {
  const data = await Head.create(values, options);
  return data?.dataValues;
}

export async function updateHead(set,query = {where : {}}){
  let[rows,data] = await Head.update(set,query);
  return {rows_affected:rows, data};
}

export async function deleteHeadByQuery(query) {
  const remove = await Head.destroy(query);
  return remove;
}