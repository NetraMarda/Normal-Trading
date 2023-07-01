import { GstRateMaster } from "./gstRateMaster.model.js";


export async function insertIntoGstRateMaster(
    values,
    options = { returning: true }
  ) {
    const data = await GstRateMaster.create(values, options);
    return data?.dataValues;
  }
  
  export async function deleteGstRateMasterByQuery(query) {
    const remove = await GstRateMaster.destroy(query);
    return remove;
  }
  
  export async function updateIntoGstRateMaster(set,query = {where : {}}){
    let[rows,data] = await GstRateMaster.update(set,query);
    return {rows_affected:rows, data};
  }
  