import { Op} from "sequelize";
import {
  deleteDetailsByQuery,
  insertIntoDetailsByQuery,
  updateDetailsByQuery,
} from "../../models/details/Service.js";
import { Details } from "../../models/details/details.model.js";
import { Head } from "../../models/head/head.model.js";
import {
  deleteHeadByQuery,
  insertIntoHead,
  updateHead,
} from "../../models/head/service.js";
import { validateReq } from "../../utils/joi.js";
import { sendResponse } from "../../utils/random.js";
import {
  modifyHeadDetailReq,
  insertHeadDetailReq,
  deleteHeadDetailReq,
  getHeadDetailReq,
  insertExpiryMasterReq,
  deleteExpiryMasterReq,
  updateExpiryMasterReq,
  insertGstRateMasterReq,
  deleteGstRateMasterReq,
  updateGstRateMasterReq,
  insertCompanyReq,
  deleteCompanyReq,
  updateCompanyReq,
  insertGroupMasterReq,
  deleteGroupMasterReq,
  updateGroupMasterReq,
  insertStateMasterReq,
  deleteStateMasterReq,
  updateStateMasterReq,
  insertScriptMasterReq,
  deleteScriptMasterReq,
  updateScriptMasterReq,
  insertItemMasterReq,
  deleteItemMasterReq,
  updateItemMasterReq,
  insertUsersReq,
  deleteUsersReq,
  updateUsersReq,
  insertUserFormsReq,
  deleteUserFormsReq,
  updateUserFormsReq,
  insertAccountMasterReq,
  deleteAccountMasterReq,
  updateAccountMasterReq,
  getCompanyReq,
  updateAccountingYearReq,
  deleteAccountingYearReq,
  insertAccountingYearReq,
  insertPurchaseHeadReq,
  deletePurchaseDetailReq,
  deletePurchaseHeadReq,
  updatePurchaseHeadReq,
  insertPurchaseDetailReq,
  updatePurchaseDetailReq,
  insertGLedgerReq,
  updateSaleHeadReq,
  deleteSaleHeadReq,
  insertSaleDetailReq,
  deleteSaleDetailReq,
  updateSaleDetailReq,
  insertServiceBillReq,
  deleteServiceBillReq,
  updateServiceBillReq,
  insertSaleHeadReq,
  insertServiceDetailReq,
  deleteServiceDetailReq,
  updateServiceDetailReq,
  insertTransactionDetailReq,
  deleteTransactionDetailReq,
  updateTransactionDetailReq,
  updateTransactionHeadReq,
  deleteTransactionHeadReq,
  insertTransactionHeadReq,
  insertPurchaseHeadDetailReq,
} from "./user.validator.js";
import {
  deleteExpiryMasterByQuery,
  insertIntoExpiryMaster,
  updateIntoExpiryMaster,
} from "../../models/expiryMaster/service.js";
import { ExpiryMaster } from "../../models/expiryMaster/expiryMaster.model.js";
import {
  deleteGstRateMasterByQuery,
  insertIntoGstRateMaster,
  updateIntoGstRateMaster,
} from "../../models/gstRateMaster/service.js";
import { GstRateMaster } from "../../models/gstRateMaster/gstRateMaster.model.js";
import {
  deleteCompanyByQuery,
  insertIntoCompany,
  updateIntoCompany,
} from "../../models/company/service.js";
import { Company } from "../../models/company/company.model.js";
import {
  deleteGroupMasterByQuery,
  insertIntoGroupMaster,
  updateIntoGroupMaster,
} from "../../models/groupMaster/service.js";
import { GroupMaster } from "../../models/groupMaster/groupMaster.model.js";
import {
  deleteStateMasterByQuery,
  insertIntoStateMaster,
  updateIntoStateMaster,
} from "../../models/stateMaster/service.js";
import { StateMaster } from "../../models/stateMaster/stateMaster.model.js";
import {
  deleteScriptMasterByQuery,
  insertIntoScriptMaster,
  updateIntoScriptMaster,
} from "../../models/scriptMaster/service.js";
import { ScriptMaster } from "../../models/scriptMaster/scriptMaster.model.js";
import {
  deleteItemMasterByQuery,
  insertIntoItemMaster,
  updateIntoItemMaster,
} from "../../models/itemMaster/service.js";
import { ItemMaster } from "../../models/itemMaster/itemMaster.model.js";
import {
  deleteUsersByQuery,
  insertIntoUsers,
  updateIntoUsers,
} from "../../models/users/service.js";
import { Users } from "../../models/users/users.model.js";
import {
  deleteUserFormsByQuery,
  insertIntoUserForms,
  updateIntoUserForms,
} from "../../models/userForms/sevice.js";
import { UserForms } from "../../models/userForms/userForms.model.js";
import {
  deleteAccountMasterByQuery,
  insertIntoAccountMaster,
  updateIntoAccountMaster,
} from "../../models/accountMaster/service.js";
import { AccountMaster } from "../../models/accountMaster/accountMaster.model.js";
import { sync } from "./../../utils/sync.js";
import {
  deleteAccountingYearByQuery,
  insertIntoAccountingYear,
  updateIntoAccountingYear,
} from "../../models/accountingYear/service.js";
import { AccountingYear } from "../../models/accountingYear/accountingYear.model.js";
import { PurchaseDetail } from "../../models/purchaseDetail/purchaseDetail.model.js";
import { PurchaseHead } from "../../models/purchaseHead/purchaseHead.model.js";
import {
  deletePurchaseHeadByQuery,
  insertIntoPurchaseHead,
  updateIntoPurchaseHead,
} from "../../models/purchaseHead/service.js";
import {
  deletePurchaseDetailByQuery,
  insertIntoPurchaseDetail,
  updateIntoPurchaseDetail,
} from "../../models/purchaseDetail/service.js";
import {
  deleteGLedgerByQuery,
  insertIntoGLedger,
  updateIntoGLedger,
} from "../../models/gledger/service.js";
import {
  GLedger,
  PaymentDetails,
  PaymentHead,
  SaleDetail,
  SaleHead,
  ServiceBillDetail,
  ServiceBillHead,
  TransactionDetails,
  TransactionHead,
} from "../../models/index.js";
import {
  deleteSaleHeadByQuery,
  insertIntoSaleHead,
  updateIntoSaleHead,
} from "../../models/saleHead/service.js";
import {
  deleteSaleDetailByQuery,
  insertIntoSaleDetail,
  updateIntoSaleDetail,
} from "../../models/saleDetail/service.js";
import {
  deleteServiceBillByQuery,
  insertIntoServiceBill,
  updateIntoServiceBill,
} from "../../models/serviceBillHead/service.js";
import {
  deleteServiceBillDetailByQuery,
  insertIntoServiceBillDetail,
  updateIntoServiceBillDetail,
} from "../../models/serviceBillDetail/service.js";
import {
  deleteTransactionDetailsByQuery,
  insertIntoTransactionDetails,
  updateIntoTransactionDetails,
} from "../../models/transactionDetail/service.js";
import {
  deleteTransactionHeadByQuery,
  insertIntoTransactionHead,
  updateIntoTransactionHead,
} from "../../models/transactionHead/service.js";
import { deletePaymentHeadByQuery, insertIntoPaymentHead, updateIntoPaymentHead } from "../../models/paymentHead/service.js";
import { deletePaymentDetailsByQuery, insertIntoPaymentDetails, updateIntoPaymentDetails } from "../../models/paymentDetail/service.js";

// HeadDetails

export async function getHeadDetail(req, res) {
  const { error, value } = validateReq(getHeadDetailReq, req.body);
  if (error) {
    return sendResponse(res, 422, error.details);
  }

  const { head, detail } = value;

  let apiResponse = {};
  try {
    if (head) {
      const getData = await Head.findAll({ where: { id: req.body.head.id } });
      apiResponse = { ...apiResponse, getData };
    }
    if (detail) {
      const getBuyersData = await Details.findAll({
        where: { headId: req.body.head.id },
      });
      apiResponse = { ...apiResponse, getBuyersData };
    }

    sendResponse(res, 200, apiResponse);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function insertHeadDetail(req, res) {
  const { error, value } = validateReq(insertHeadDetailReq, req.body);
  if (error) {
    return sendResponse(res, 422, error.details);
  }
  const { head, details } = value;
  try {
    const insertedData = await insertIntoHead(head);

    const buyersData = await Promise.all(
      details.map((d) => {
        const data = insertIntoDetailsByQuery({
          ...d,
          headId: insertedData.id,
        });
        return data;
      })
    );
    sendResponse(res, 200, { insertedData, buyersData });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deleteHeadDetail(req, res) {
  const { error, value } = validateReq(deleteHeadDetailReq, req.body);
  if (error) {
    return sendResponse(res, 422, error.details);
  }

  let apiResponse = {};

  try {
    const whereQuery = {
      where: {
        id: {
          [Op.in]: req.body.head.id,
        },
      },
    };
    const sellerData = await Head.findAll(whereQuery);

    const deletedSellerDataCount = await deleteHeadByQuery(whereQuery);

    const query = {
      where: {
        headId: {
          [Op.in]: req.body.head.id,
        },
      },
    };
    const buyerData = await Details.findAll(query);
    const deletedBuyerDataCount = await deleteDetailsByQuery(query);

    apiResponse = {
      ...apiResponse,
      rows_affected_in_detail: deletedBuyerDataCount,
      detail_data: buyerData,
      rows_affected_in_head: deletedSellerDataCount,
      head_data: sellerData,
    };

    return sendResponse(res, 200, apiResponse);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function modifyHeadDetail(req, res) {
  const { error, value } = validateReq(modifyHeadDetailReq, req.body);
  if (error) {
    return sendResponse(res, 422, error.details);
  }

  let apiResponse = {};
  try {
    //head update
    if (req.body.head) {
      const updatedSellerData = await updateHead(value.head, {
        where: { id: req.body.head.id },
        returning: true,
      });
      apiResponse = { ...apiResponse, updatedSellerData };
    }

    // detail delete
    if (req.body.detail.delete) {
      const whereQuery = {
        where: {
          detailsId: {
            [Op.in]: req.body.detail.delete.detailIds,
          },
        },
      };
      const buyerData = await Details.findAll(whereQuery);
      const deletedBuyerDataCount = await deleteDetailsByQuery(whereQuery);
      apiResponse = {
        ...apiResponse,
        deletedBuyerData: {
          rows_affected: deletedBuyerDataCount,
          data: buyerData,
        },
      };
    }

    // detail insert
    if (req.body.detail.insert) {
      const insertedBuyersData = await Promise.all(
        req.body.detail.insert.map((d) => {
          const insertedData = insertIntoDetailsByQuery(d);
          return insertedData;
        })
      );
      apiResponse = { ...apiResponse, insertedBuyersData };
    }

    // detail update
    if (req.body.detail.update) {
      const updatedDetailData = await Promise.all(
        req.body.detail.update.map((data) => {
          const { detailId, ...others } = data;
          return updateDetailsByQuery(others, {
            where: { detailsId: detailId },
            returning: true,
          });
        })
      );
      apiResponse = { ...apiResponse, updatedDetailData };
    }

    sendResponse(res, 200, { message: "success", data: apiResponse });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

// ExpiryMaster

export async function insertExpiryMaster(req, res) {
  const { error, value } = validateReq(insertExpiryMasterReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }

  try {
    const expiryMasterData = await insertIntoExpiryMaster(value);
    return sendResponse(res, 200, expiryMasterData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deleteExpiryMaster(req, res) {
  const { error, value } = validateReq(deleteExpiryMasterReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        id: {
          [Op.in]: req.body.id,
        },
      },
    };
    const expiryMasterData = await ExpiryMaster.findAll(whereQuery);

    const deletedExpiryMasterDataCount = await deleteExpiryMasterByQuery(
      whereQuery
    );

    return sendResponse(res, 200, {
      rows_affected: deletedExpiryMasterDataCount,
      data: expiryMasterData,
    });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getExpiryMaster(req, res) {
  const { error, value } = validateReq(deleteExpiryMasterReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getExpiryMasterData = await ExpiryMaster.findAll({
      where: { id: req.body.id },
    });
    return sendResponse(res, 200, getExpiryMasterData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updateExpiryMaster(req, res) {
  const { error, value } = validateReq(updateExpiryMasterReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const updateExpiryMasterData = await updateIntoExpiryMaster(value, {
      where: { id: req.body.id },
      returning: true,
    });
    return sendResponse(res, 200, updateExpiryMasterData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

// Company

export async function insertCompany(req, res) {
  const { error, value } = validateReq(insertCompanyReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const CompanyData = await insertIntoCompany(value);
    sendResponse(res, 200, CompanyData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deleteCompany(req, res) {
  const { error, value } = validateReq(deleteCompanyReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        id: value.id,
      },
    };
    const where = {
      where: {
        companyCode: value.id,
      },
    };
    const accountMasterData = await AccountMaster.findAll(where);
    const groupMasterData = await GroupMaster.findAll(where);
    const CompanyData = await Company.findAll(whereQuery);

    if (groupMasterData == "" && accountMasterData == "") {
      const deletedCompanyDataCount = await deleteCompanyByQuery(whereQuery);
      return sendResponse(res, 200, {
        rows_affected: deletedCompanyDataCount,
        data: CompanyData,
      });
    }
    if (groupMasterData != "") {
      return sendResponse(res, 500, {
        message: "The data is present in GROUPMASTER so it can't be deleted",
      });
    }
    if (accountMasterData != "") {
      return sendResponse(res, 500, {
        message: "The data is present in ACCOUNTMASTER so it can't be deleted",
      });
    }
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getCompany(req, res) {
  const { error, value } = validateReq(getCompanyReq, req.params);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getCompanyData = await Company.findOne({
      where: { id: value.id },
    });
    return sendResponse(res, 200, getCompanyData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updateCompany(req, res) {
  const { error, value } = validateReq(updateCompanyReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    //if (!req.body.createdBy) {
    const updateCompanyData = await updateIntoCompany(value, {
      where: { id: value.id },
      returning: true,
    });
    return sendResponse(res, 200, updateCompanyData);
    //}
    //return sendResponse(res, 500, { message: "createdBy cannot be updated" });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getAllCompanyData(req, res) {
  try {
    const allData = await Company.findAll();
    sendResponse(res, 200, allData);
  } catch (error) {
    sendResponse(res, 500, error);
  }
}

// AccountMaster

export async function insertAccountMaster(req, res) {
  const { error, value } = validateReq(insertAccountMasterReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const AccountMasterData = await insertIntoAccountMaster(value);
    sendResponse(res, 200, AccountMasterData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deleteAccountMaster(req, res) {
  const { error, value } = validateReq(deleteAccountMasterReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        id: value.id,
      },
    };
    const where = {
      where: {
        ac: value.id,
      },
    };
    const pdWhere = {
      where: {
        purchaseAc: value.id,
      },
    };
    const sdWhere = {
      where: {
        saleAc: value.id,
      },
    };
    const serWhere = {
      where: {
        cc: value.id,
      },
    };
    const PurchaseHeadData = await PurchaseHead.findAll(where);
    const PurchaseDetailData = await PurchaseDetail.findAll(pdWhere);
    const SaleHeadData = await SaleHead.findAll(where);
    const SaleDetailData = await SaleDetail.findAll(sdWhere);
    const ServiceHeadData = await ServiceBillHead.findAll(serWhere);
    const AccountMasterData = await AccountMaster.findAll(whereQuery);

    if (
      PurchaseHeadData == "" &&
      PurchaseDetailData == "" &&
      SaleHeadData == "" &&
      SaleDetailData == "" &&
      ServiceHeadData == ""
    ) {
      const deletedAccountMasterDataCount = await deleteAccountMasterByQuery(
        whereQuery
      );

      return sendResponse(res, 200, {
        rows_affected: deletedAccountMasterDataCount,
        data: AccountMasterData,
      });
    }

    if (PurchaseHeadData != "") {
      return sendResponse(res, 500, {
        message: "The data is present in PurchaseHead so it can't be deleted",
      });
    }
    if (PurchaseDetailData != "") {
      return sendResponse(res, 500, {
        message: "The data is present in PurchaseDetail so it can't be deleted",
      });
    }
    if (SaleHeadData != "") {
      return sendResponse(res, 500, {
        message: "The data is present in SaleHead so it can't be deleted",
      });
    }
    if (SaleDetailData != "") {
      return sendResponse(res, 500, {
        message: "The data is present in Saledetail so it can't be deleted",
      });
    }
    if (ServiceHeadData != "") {
      return sendResponse(res, 500, {
        message:
          "The data is present in ServiceBillHead so it can't be deleted",
      });
    }
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getAccountMaster(req, res) {
  const { error, value } = validateReq(deleteAccountMasterReq, req.params);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getAccountMasterData = await AccountMaster.findOne({
      where: { companyCode: value.id },
    });
    console.log("data", getAccountMasterData.dataValues);
    return sendResponse(res, 200, getAccountMasterData?.dataValues);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updateAccountMaster(req, res) {
  const { error, value } = validateReq(updateAccountMasterReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    //if (!req.body.createdBy) {
    const updateAccountMasterData = await updateIntoAccountMaster(value, {
      where: { id: value.id },
      returning: true,
    });
    return sendResponse(res, 200, updateAccountMasterData);
    // }
    //return sendResponse(res, 500, { message: "createdBy cannot be updated" });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getAllAccountData(req, res) {
  try {
    const allData = await AccountMaster.findAll();

    sendResponse(res, 200, allData);
  } catch (error) {
    sendResponse(res, 500, error);
  }
}
// GroupMaster

export async function insertGroupMaster(req, res) {
  const { error, value } = validateReq(insertGroupMasterReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const GroupMasterData = await insertIntoGroupMaster(value);
    sendResponse(res, 200, GroupMasterData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deleteGroupMaster(req, res) {
  const { error, value } = validateReq(deleteGroupMasterReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        id: value.id,
      },
    };
    const GroupMasterData = await GroupMaster.findAll(whereQuery);

    const deletedGroupMasterDataCount = await deleteGroupMasterByQuery(
      whereQuery
    );

    return sendResponse(res, 200, {
      rows_affected: deletedGroupMasterDataCount,
      data: GroupMasterData,
    });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getGroupMaster(req, res) {
  const { error, value } = validateReq(deleteGroupMasterReq, req.params);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getGroupMasterData = await GroupMaster.findOne({
      where: { companyCode: value.id },
    });
    console.log(getGroupMasterData?.dataValues);
    return sendResponse(res, 200, getGroupMasterData?.dataValues);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updateGroupMaster(req, res) {
  const { error, value } = validateReq(updateGroupMasterReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    // if (!req.body.createdBy) {
    const updateGroupMasterData = await updateIntoGroupMaster(value, {
      where: { id: value.id },
      returning: true,
    });
    return sendResponse(res, 200, updateGroupMasterData);

    // return sendResponse(res, 500, { message: "createdBy cannot be updated" });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getAllGroupMastertData(req, res) {
  try {
    const allData = await GroupMaster.findAll();
    console.log(allData);
    sendResponse(res, 200, allData);
  } catch (error) {
    sendResponse(res, 500, error);
  }
}

// GstRateMaster

export async function insertGstRateMaster(req, res) {
  const { error, value } = validateReq(insertGstRateMasterReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }

  try {
    const gstRateMasterData = await insertIntoGstRateMaster(value);
    return sendResponse(res, 200, gstRateMasterData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deleteGstRateMaster(req, res) {
  const { error, value } = validateReq(deleteGstRateMasterReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        id: value.id,
      },
    };
    const where = {
      where: {
        gstId: value.id,
      },
    };
    const sbWhere = {
      where: {
        gstRateCode: value.id,
      },
    };
    const PurchaseDetailData = await PurchaseDetail.findAll(where);
    const SaleDetailData = await SaleDetail.findAll(where);
    const ServiceBillData = await ServiceBillHead.findAll(sbWhere);
    const GstRateMasterData = await GstRateMaster.findAll(whereQuery);

    if (
      PurchaseDetailData == "" &&
      SaleDetailData == "" &&
      ServiceBillData == ""
    ) {
      const deletedGstRateMasterDataCount = await deleteGstRateMasterByQuery(
        whereQuery
      );

      return sendResponse(res, 200, {
        rows_affected: deletedGstRateMasterDataCount,
        data: GstRateMasterData,
      });
    }

    if (PurchaseDetailData != "") {
      return sendResponse(res, 500, {
        message: "The data is present in PurchaseDetail so it can't be deleted",
      });
    }
    if (SaleDetailData != "") {
      return sendResponse(res, 500, {
        message: "The data is present in SaleDetail so it can't be deleted",
      });
    }
    if (ServiceBillData != "") {
      return sendResponse(res, 500, {
        message: "The data is present in ServiceBill so it can't be deleted",
      });
    }
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getGstRateMaster(req, res) {
  const { error, value } = validateReq(deleteGstRateMasterReq, req.params);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getGstRateMasterData = await GstRateMaster.findOne({
      where: { id: value.id },
    });
    return sendResponse(res, 200, getGstRateMasterData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updateGstRateMaster(req, res) {
  const { error, value } = validateReq(updateGstRateMasterReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    //if (!req.body.createdBy) {
    const updateGstRateMasterData = await updateIntoGstRateMaster(value, {
      where: { id: req.body.id },
      returning: true,
    });
    return sendResponse(res, 200, updateGstRateMasterData);
    //}
    //return sendResponse(res, 500, { message: "createdBy cannot be updated" });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getAllGstRateMasterData(req, res) {
  try {
    const allData = await GstRateMaster.findAll();

    sendResponse(res, 200, allData);
  } catch (error) {
    sendResponse(res, 500, error);
  }
}

// StateMaster

export async function insertStateMaster(req, res) {
  const { error, value } = validateReq(insertStateMasterReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const StateMasterData = await insertIntoStateMaster(value);
    sendResponse(res, 200, StateMasterData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deleteStateMaster(req, res) {
  const { error, value } = validateReq(deleteStateMasterReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        id: value.id,
      },
    };
    const StateMasterData = await StateMaster.findAll(whereQuery);

    const deletedStateMasterDataCount = await deleteStateMasterByQuery(
      whereQuery
    );

    return sendResponse(res, 200, {
      rows_affected: deletedStateMasterDataCount,
      data: StateMasterData,
    });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getStateMaster(req, res) {
  const { error, value } = validateReq(deleteStateMasterReq, req.params);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getStateMasterData = await StateMaster.findOne({
      where: { id: value.id },
    });
    return sendResponse(res, 200, getStateMasterData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updateStateMaster(req, res) {
  const { error, value } = validateReq(updateStateMasterReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    //if (!req.body.createdBy) {
    const updateStateMasterData = await updateIntoStateMaster(value, {
      where: { id: value.id },
      returning: true,
    });
    return sendResponse(res, 200, updateStateMasterData);
    //}
    //return sendResponse(res, 500, { message: "createdBy cannot be updated" });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getAllStateMasterData(req, res) {
  try {
    const allData = await StateMaster.findAll();

    sendResponse(res, 200, allData);
  } catch (error) {
    sendResponse(res, 500, error);
  }
}

// ScriptMaster

export async function insertScriptMaster(req, res) {
  const { error, value } = validateReq(insertScriptMasterReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const ScriptMasterData = await insertIntoScriptMaster(value);
    sendResponse(res, 200, ScriptMasterData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deleteScriptMaster(req, res) {
  const { error, value } = validateReq(deleteScriptMasterReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        id: value.id,
      },
    };
    const ScriptMasterData = await ScriptMaster.findAll(whereQuery);

    const deletedScriptMasterDataCount = await deleteScriptMasterByQuery(
      whereQuery
    );

    return sendResponse(res, 200, {
      rows_affected: deletedScriptMasterDataCount,
      data: ScriptMasterData,
    });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getScriptMaster(req, res) {
  const { error, value } = validateReq(deleteScriptMasterReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getScriptMasterData = await ScriptMaster.findAll({
      where: { id: value.id },
    });
    return sendResponse(res, 200, getScriptMasterData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updateScriptMaster(req, res) {
  const { error, value } = validateReq(updateScriptMasterReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    // if (!req.body.createdBy) {
    const updateScriptMasterData = await updateIntoScriptMaster(value, {
      where: { id: value.id },
      returning: true,
    });
    return sendResponse(res, 200, updateScriptMasterData);
    //}
    //return sendResponse(res, 500, { message: "createdBy cannot be updated" });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

// ItemMaster

export async function insertItemMaster(req, res) {
  const { error, value } = validateReq(insertItemMasterReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const ItemMasterData = await insertIntoItemMaster(value);
    sendResponse(res, 200, ItemMasterData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deleteItemMaster(req, res) {
  const { error, value } = validateReq(deleteItemMasterReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        id: value.id,
      },
    };
    const where = {
      where: {
        ic: value.id,
      },
    };
    const PurchaseDetailData = await PurchaseDetail.findAll(where);
    const SaleDetailData = await SaleDetail.findAll(where);
    const ItemMasterData = await ItemMaster.findAll(whereQuery);

    if (PurchaseDetailData == "" && SaleDetailData == "") {
      const deletedItemMasterDataCount = await deleteItemMasterByQuery(
        whereQuery
      );

      return sendResponse(res, 200, {
        rows_affected: deletedItemMasterDataCount,
        data: ItemMasterData,
      });
    }

    if (PurchaseDetailData != "") {
      return sendResponse(res, 500, {
        message: "The data is present in PurchaseDetail so it can't be deleted",
      });
    }
    if (SaleDetailData != "") {
      return sendResponse(res, 500, {
        message: "The data is present in SaleDetail so it can't be deleted",
      });
    }
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getItemMaster(req, res) {
  const { error, value } = validateReq(deleteItemMasterReq, req.params);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getItemMasterData = await ItemMaster.findOne({
      where: { id: value.id },
    });
    return sendResponse(res, 200, getItemMasterData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updateItemMaster(req, res) {
  const { error, value } = validateReq(updateItemMasterReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    //if (!req.body.createdBy) {
    const updateItemMasterData = await updateIntoItemMaster(value, {
      where: { id: value.id },
      returning: true,
    });
    return sendResponse(res, 200, updateItemMasterData);
    //}
    //return sendResponse(res, 500, { message: "createdBy cannot be updated" });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getAllItemMasterData(req, res) {
  try {
    const allData = await ItemMaster.findAll();

    sendResponse(res, 200, allData);
  } catch (error) {
    sendResponse(res, 500, error);
  }
}

// Users

export async function insertUsers(req, res) {
  const { error, value } = validateReq(insertUsersReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const UsersData = await insertIntoUsers(value);
    sendResponse(res, 200, UsersData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deleteUsers(req, res) {
  const { error, value } = validateReq(deleteUsersReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        id: value.id,
      },
    };
    const UsersData = await Users.findAll(whereQuery);

    const deletedUsersDataCount = await deleteUsersByQuery(whereQuery);

    return sendResponse(res, 200, {
      rows_affected: deletedUsersDataCount,
      data: UsersData,
    });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getUsers(req, res) {
  const { error, value } = validateReq(deleteUsersReq, req.params);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getUsersData = await Users.findOne({
      where: { id: value.id },
    });
    return sendResponse(res, 200, getUsersData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updateUsers(req, res) {
  const { error, value } = validateReq(updateUsersReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    //if (!req.body.createdBy) {
    const updateUsersData = await updateIntoUsers(value, {
      where: { id: value.id },
      returning: true,
    });
    return sendResponse(res, 200, updateUsersData);
    //}
    //return sendResponse(res, 500, { message: "createdBy cannot be updated" });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getAllUsersData(req, res) {
  try {
    const allData = await Users.findAll();
    // console.log(allData);
    sendResponse(res, 200, allData);
  } catch (error) {
    sendResponse(res, 500, error);
  }
}
// UserForms

export async function insertUserForms(req, res) {
  const { error, value } = validateReq(insertUserFormsReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const UserFormsData = await insertIntoUserForms(value);
    sendResponse(res, 200, UserFormsData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deleteUserForms(req, res) {
  const { error, value } = validateReq(deleteUserFormsReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        id: value.id,
      },
    };
    const UserFormsData = await UserForms.findAll(whereQuery);

    const deletedUserFormsDataCount = await deleteUserFormsByQuery(whereQuery);

    return sendResponse(res, 200, {
      rows_affected: deletedUserFormsDataCount,
      data: UserFormsData,
    });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getUserForms(req, res) {
  const { error, value } = validateReq(deleteUserFormsReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getUserFormsData = await UserForms.findAll({
      where: { id: value.id },
    });
    return sendResponse(res, 200, getUserFormsData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updateUserForms(req, res) {
  const { error, value } = validateReq(updateUserFormsReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const updateUserFormsData = await updateIntoUserForms(value, {
      where: { id: value.id },
      returning: true,
    });
    return sendResponse(res, 200, updateUserFormsData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

//Accounting Year

export async function insertAccountingYear(req, res) {
  const { error, value } = validateReq(insertAccountingYearReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const AccountingYearData = await insertIntoAccountingYear(value);
    sendResponse(res, 200, AccountingYearData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deleteAccountingYear(req, res) {
  const { error, value } = validateReq(deleteAccountingYearReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        id: value.id,
      },
    };
    const AccountingYearData = await AccountingYear.findAll(whereQuery);

    const deletedAccountingYearDataCount = await deleteAccountingYearByQuery(
      whereQuery
    );

    return sendResponse(res, 200, {
      rows_affected: deletedAccountingYearDataCount,
      data: AccountingYearData,
    });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getAccountingYear(req, res) {
  const { error, value } = validateReq(deleteAccountingYearReq, req.params);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getAccountingYearData = await AccountingYear.findOne({
      where: { id: value.id },
    });
    return sendResponse(res, 200, getAccountingYearData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updateAccountingYear(req, res) {
  const { error, value } = validateReq(updateAccountingYearReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const updateAccountingYearData = await updateIntoAccountingYear(value, {
      where: { id: value.id },
      returning: true,
    });
    return sendResponse(res, 200, updateAccountingYearData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getAllAccountingYearData(req, res) {
  try {
    const allData = await AccountingYear.findAll();
    // console.log(allData);
    sendResponse(res, 200, allData);
  } catch (error) {
    sendResponse(res, 500, error);
  }
}

// Purchase Head

export async function insertPurchaseHead(req, res) {
  const { error, value } = validateReq(insertPurchaseHeadReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const PurchaseHeadData = await insertIntoPurchaseHead(value);
    sendResponse(res, 200, PurchaseHeadData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deletePurchaseHead(req, res) {
  const { error, value } = validateReq(deletePurchaseDetailReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        id: value.id,
      },
    };
    const where = {
      where: {
        psId: value.id,
      },
    };

    const PurchaseDetailData = await PurchaseDetail.findAll(where);
    const PurchaseHeadData = await PurchaseHead.findAll(whereQuery);

    if (PurchaseDetailData == "" && PurchaseHeadData == "") {
      const deletedPurchaseHeadDataCount = await deletePurchaseHeadByQuery(
        whereQuery
      );

      return sendResponse(res, 200, {
        rows_affected: deletedPurchaseHeadDataCount,
        data: PurchaseHeadData,
      });
    }

    if (PurchaseDetailData != "") {
      return sendResponse(res, 500, {
        message: "The data is present in PurchaseDetail so it can't be deleted",
      });
    }
    if (PurchaseHeadData != "") {
      return sendResponse(res, 500, {
        message: "The data is present in PurchaseHead so it can't be deleted",
      });
    }
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getPurchaseHead(req, res) {
  const { error, value } = validateReq(deletePurchaseHeadReq, req.params);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getPuchaseHeadData = await PurchaseHead.findOne({
      where: { id: value.id },
    });
    return sendResponse(res, 200, getPuchaseHeadData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updatePurchaseHead(req, res) {
  const { error, value } = validateReq(updatePurchaseHeadReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const updatePurchaseHeadData = await updateIntoPurchaseHead(value, {
      where: { id: value.id },
      returning: true,
    });
    return sendResponse(res, 200, updatePurchaseHeadData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getAllPurchaseHeadData(req, res) {
  try {
    const allData = await PurchaseHead.findAll();
    // console.log(allData);
    sendResponse(res, 200, allData);
  } catch (error) {
    sendResponse(res, 500, error);
  }
}

// Purchase Detail
export async function insertPurchaseDetail(req, res) {
  const { error, value } = validateReq(insertPurchaseDetailReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const PurchaseDetailData = await insertIntoPurchaseDetail(value);
    sendResponse(res, 200, PurchaseDetailData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deletePurchaseDetail(req, res) {
  const { error, value } = validateReq(deletePurchaseDetailReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        id: value.id,
      },
    };
    const PurchaseDetailData = await PurchaseDetail.findAll(whereQuery);

    const deletedPurchaseDetailDataCount = await deletePurchaseDetailByQuery(
      whereQuery
    );

    return sendResponse(res, 200, {
      rows_affected: deletedPurchaseDetailDataCount,
      data: PurchaseDetailData,
    });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getPurchaseDetail(req, res) {
  const { error, value } = validateReq(deletePurchaseDetailReq, req.params);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getPuchaseDetailData = await PurchaseDetail.findOne({
      where: { id: value.id },
    });
    return sendResponse(res, 200, getPuchaseDetailData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updatePurchaseDetail(req, res) {
  const { error, value } = validateReq(updatePurchaseDetailReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const updatePurchaseDetailData = await updateIntoPurchaseDetail(value, {
      where: { id: value.id },
      returning: true,
    });
    return sendResponse(res, 200, updatePurchaseDetailData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getAllPurchaseDetailData(req, res) {
  try {
    const allData = await PurchaseDetail.findAll();
    // console.log(allData);
    sendResponse(res, 200, allData);
  } catch (error) {
    sendResponse(res, 500, error);
  }
}

//gledger

export async function insertGLedger(req, res) {
  const { error, value } = validateReq(insertGLedgerReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const GLedgerData = await insertIntoGLedger(value);
    sendResponse(res, 200, GLedgerData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deleteGLedger(req, res) {
  const { error, value } = validateReq(deleteGLedgerReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        progId: value.id,
      },
    };
    const GLedgerData = await GLedger.findAll(whereQuery);

    const deletedGLedgerDataCount = await deleteGLedgerByQuery(whereQuery);

    return sendResponse(res, 200, {
      rows_affected: deletedGLedgerDataCount,
      data: GLedgerData,
    });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getGLedger(req, res) {
  const { error, value } = validateReq(deleteGLedgerReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getGLedgerData = await GLedger.findAll({
      where: { id: value.id },
    });
    return sendResponse(res, 200, getGLedgerData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updateGLedger(req, res) {
  const { error, value } = validateReq(updateGLedgerReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const updateGLedgerData = await updateIntoGLedger(value, {
      where: { id: value.id },
      returning: true,
    });
    return sendResponse(res, 200, updateGLedgerData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getAllGLedgerData(req, res) {
  try {
    const allData = await GLedger.findAll();
    // console.log(allData);
    sendResponse(res, 200, allData);
  } catch (error) {
    sendResponse(res, 500, error);
  }
}

//SaleHead
export async function insertSaleHead(req, res) {
  const { error, value } = validateReq(insertSaleHeadReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const SaleHeadData = await insertIntoSaleHead(value);
    sendResponse(res, 200, SaleHeadData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deleteSaleHead(req, res) {
  const { error, value } = validateReq(deleteSaleDetailReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        id: value.id,
      },
    };
    const where = {
      where: {
        sbId: value.id,
      },
    };
    const SaleDetailData = await SaleDetail.findAll(where);
    const SaleHeadData = await SaleHead.findAll(whereQuery);

    if (SaleDetailData == "") {
      const deletedSaleHeadDataCount = await deleteSaleHeadByQuery(whereQuery);

      return sendResponse(res, 200, {
        rows_affected: deletedSaleHeadDataCount,
        data: SaleHeadData,
      });
    }

    if (SaleDetailData != "") {
      return sendResponse(res, 500, {
        message: "The data is present in SaleDetail so it can't be deleted",
      });
    }
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getSaleHead(req, res) {
  const { error, value } = validateReq(deleteSaleHeadReq, req.params);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getSaleHeadData = await SaleHead.findOne({
      where: { id: value.id },
    });
    return sendResponse(res, 200, getSaleHeadData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updateSaleHead(req, res) {
  const { error, value } = validateReq(updateSaleHeadReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const updateSaleHeadData = await updateIntoSaleHead(value, {
      where: { id: value.id },
      returning: true,
    });
    return sendResponse(res, 200, updateSaleHeadData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getAllSaleHeadData(req, res) {
  try {
    const allData = await SaleHead.findAll();
    // console.log(allData);
    sendResponse(res, 200, allData);
  } catch (error) {
    sendResponse(res, 500, error);
  }
}

//SaleDetail
export async function insertSaleDetail(req, res) {
  const { error, value } = validateReq(insertSaleDetailReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const SaleDetailData = await insertIntoSaleDetail(value);
    sendResponse(res, 200, SaleDetailData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deleteSaleDetail(req, res) {
  const { error, value } = validateReq(deleteSaleDetailReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        id: value.id,
      },
    };
    const SaleDetailData = await SaleDetail.findAll(whereQuery);

    const deletedSaleDetailDataCount = await deleteSaleDetailByQuery(
      whereQuery
    );

    return sendResponse(res, 200, {
      rows_affected: deletedSaleDetailDataCount,
      data: SaleDetailData,
    });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getSaleDetail(req, res) {
  const { error, value } = validateReq(deleteSaleDetailReq, req.params);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getSaleDetailData = await SaleDetail.findOne({
      where: { id: value.id },
    });
    return sendResponse(res, 200, getSaleDetailData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updateSaleDetail(req, res) {
  const { error, value } = validateReq(updateSaleDetailReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const updateSaleDetailData = await updateIntoSaleDetail(value, {
      where: { id: value.id },
      returning: true,
    });
    return sendResponse(res, 200, updateSaleDetailData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getAllSaleDetailData(req, res) {
  try {
    const allData = await SaleDetail.findAll();
    // console.log(allData);
    sendResponse(res, 200, allData);
  } catch (error) {
    sendResponse(res, 500, error);
  }
}

//serviceBillHead

export async function insertServiceHeadBill(req, res) {
  const { error, value } = validateReq(insertServiceBillReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const ServiceBillData = await insertIntoServiceBill(value);
    sendResponse(res, 200, ServiceBillData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deleteServiceHeadBill(req, res) {
  const { error, value } = validateReq(deleteServiceBillReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        id: value.id,
      },
    };
    const ServiceBillData = await ServiceBillHead.findAll(whereQuery);

    const deletedServiceBillDataCount = await deleteServiceBillByQuery(
      whereQuery
    );

    return sendResponse(res, 200, {
      rows_affected: deletedServiceBillDataCount,
      data: ServiceBillData,
    });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getServiceHeadBill(req, res) {
  const { error, value } = validateReq(deleteServiceBillReq, req.params);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getServiceBillData = await ServiceBillHead.findOne({
      where: { id: value.id },
    });
    return sendResponse(res, 200, getServiceBillData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updateServiceHeadBill(req, res) {
  const { error, value } = validateReq(updateServiceBillReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const updateServiceBillData = await updateIntoServiceBill(value, {
      where: { id: value.id },
      returning: true,
    });
    return sendResponse(res, 200, updateServiceBillData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getAllServiceHeadBillData(req, res) {
  try {
    const allData = await ServiceBillHead.findAll();
    // console.log(allData);
    sendResponse(res, 200, allData);
  } catch (error) {
    sendResponse(res, 500, error);
  }
}

// serviceBill Detail

export async function insertServiceDetailBill(req, res) {
  const { error, value } = validateReq(insertServiceDetailReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const ServiceBillData = await insertIntoServiceBillDetail(value);
    sendResponse(res, 200, ServiceBillData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deleteServiceDetailBill(req, res) {
  const { error, value } = validateReq(deleteServiceDetailReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        id: value.id,
      },
    };
    const ServiceBillData = await ServiceBillDetail.findAll(whereQuery);

    const deletedServiceBillDataCount = await deleteServiceBillDetailByQuery(
      whereQuery
    );

    return sendResponse(res, 200, {
      rows_affected: deletedServiceBillDataCount,
      data: ServiceBillData,
    });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getServiceDetailBill(req, res) {
  const { error, value } = validateReq(deleteServiceDetailReq, req.params);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getServiceBillData = await ServiceBillDetail.findOne({
      where: { id: value.id },
    });
    return sendResponse(res, 200, getServiceBillData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updateServiceDetailBill(req, res) {
  const { error, value } = validateReq(updateServiceDetailReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const updateServiceBillData = await updateIntoServiceBillDetail(value, {
      where: { id: value.id },
      returning: true,
    });
    return sendResponse(res, 200, updateServiceBillData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getAllServiceDetailBillData(req, res) {
  try {
    const allData = await ServiceBillDetail.findAll();
    // console.log(allData);
    sendResponse(res, 200, allData);
  } catch (error) {
    sendResponse(res, 500, error);
  }
}

//Transaction Head
export async function insertTransactionHead(req, res) {
  const { error, value } = validateReq(insertTransactionHeadReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const ServiceBillData = await insertIntoTransactionHead(value);
    sendResponse(res, 200, ServiceBillData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deleteTransactionHead(req, res) {
  const { error, value } = validateReq(deleteTransactionHeadReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        id: value.id,
      },
    };
    const ServiceBillData = await TransactionHead.findAll(whereQuery);

    const deletedServiceBillDataCount = await deleteTransactionHeadByQuery(
      whereQuery
    );

    return sendResponse(res, 200, {
      rows_affected: deletedServiceBillDataCount,
      data: ServiceBillData,
    });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getTransactionHead(req, res) {
  const { error, value } = validateReq(deleteTransactionHeadReq, req.params);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getServiceBillData = await TransactionHead.findOne({
      where: { id: value.id },
    });
    return sendResponse(res, 200, getServiceBillData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updateTransactionHead(req, res) {
  const { error, value } = validateReq(updateTransactionHeadReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const updateServiceBillData = await updateIntoTransactionHead(value, {
      where: { id: value.id },
      returning: true,
    });
    return sendResponse(res, 200, updateServiceBillData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getAllTransactionHeadData(req, res) {
  try {
    const allData = await TransactionHead.findAll();
    // console.log(allData);
    sendResponse(res, 200, allData);
  } catch (error) {
    sendResponse(res, 500, error);
  }
}

//Transaction Detail

export async function insertTransactionDetail(req, res) {
  const { error, value } = validateReq(insertTransactionDetailReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const ServiceBillData = await insertIntoTransactionDetails(value);
    sendResponse(res, 200, ServiceBillData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deleteTransactionDetail(req, res) {
  const { error, value } = validateReq(deleteTransactionDetailReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        id: value.id,
      },
    };
    const ServiceBillData = await TransactionDetails.findAll(whereQuery);

    const deletedServiceBillDataCount = await deleteTransactionDetailsByQuery(
      whereQuery
    );

    return sendResponse(res, 200, {
      rows_affected: deletedServiceBillDataCount,
      data: ServiceBillData,
    });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getTransactionDetail(req, res) {
  const { error, value } = validateReq(deleteTransactionDetailReq, req.params);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getServiceBillData = await TransactionDetails.findOne({
      where: { id: value.id },
    });
    return sendResponse(res, 200, getServiceBillData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updateTransactionDetail(req, res) {
  const { error, value } = validateReq(updateTransactionDetailReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const updateServiceBillData = await updateIntoTransactionDetails(value, {
      where: { id: value.id },
      returning: true,
    });
    return sendResponse(res, 200, updateServiceBillData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getAllTransactionDetailData(req, res) {
  try {
    const allData = await TransactionDetails.findAll();
    // console.log(allData);
    sendResponse(res, 200, allData);
  } catch (error) {
    sendResponse(res, 500, error);
  }
}

// Reciept/Payment
export async function insertPaymentHead(req, res) {
  const { error, value } = validateReq(insertTransactionHeadReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const ServiceBillData = await insertIntoPaymentHead(value);
    sendResponse(res, 200, ServiceBillData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deletePaymentHead(req, res) {
  const { error, value } = validateReq(deleteTransactionHeadReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        id: value.id,
      },
    };
    const ServiceBillData = await PaymentHead.findAll(whereQuery);

    const deletedServiceBillDataCount = await deletePaymentHeadByQuery(
      whereQuery
    );

    return sendResponse(res, 200, {
      rows_affected: deletedServiceBillDataCount,
      data: ServiceBillData,
    });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getPaymentHead(req, res) {
  const { error, value } = validateReq(deleteTransactionHeadReq, req.params);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getServiceBillData = await PaymentHead.findOne({
      where: { id: value.id },
    });
    return sendResponse(res, 200, getServiceBillData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updatePaymentHead(req, res) {
  const { error, value } = validateReq(updateTransactionHeadReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const updateServiceBillData = await updateIntoPaymentHead(value, {
      where: { id: value.id },
      returning: true,
    });
    return sendResponse(res, 200, updateServiceBillData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getAllPaymentHeadData(req, res) {
  try {
    const allData = await PaymentHead.findAll();
    // console.log(allData);
    sendResponse(res, 200, allData);
  } catch (error) {
    sendResponse(res, 500, error);
  }
}

//Reciept/Payment Detail
export async function insertPaymentDetail(req, res) {
  const { error, value } = validateReq(insertTransactionDetailReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const ServiceBillData = await insertIntoPaymentDetails(value);
    sendResponse(res, 200, ServiceBillData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function deletePaymentDetail(req, res) {
  const { error, value } = validateReq(deleteTransactionDetailReq, req.body);
  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const whereQuery = {
      where: {
        id: value.id,
      },
    };
    const ServiceBillData = await PaymentDetails.findAll(whereQuery);

    const deletedServiceBillDataCount = await deletePaymentDetailsByQuery(
      whereQuery
    );

    return sendResponse(res, 200, {
      rows_affected: deletedServiceBillDataCount,
      data: ServiceBillData,
    });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getPaymentDetail(req, res) {
  const { error, value } = validateReq(deleteTransactionDetailReq, req.params);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const getServiceBillData = await PaymentDetails.findOne({
      where: { id: value.id },
    });
    return sendResponse(res, 200, getServiceBillData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function updatePaymentDetail(req, res) {
  const { error, value } = validateReq(updateTransactionDetailReq, req.body);

  if (error) {
    return sendResponse(res, 422, error);
  }
  try {
    const updateServiceBillData = await updateIntoPaymentDetails(value, {
      where: { id: value.id },
      returning: true,
    });
    return sendResponse(res, 200, updateServiceBillData);
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

export async function getAllPaymentDetailData(req, res) {
  try {
    const allData = await PaymentDetails.findAll();
    // console.log(allData);
    sendResponse(res, 200, allData);
  } catch (error) {
    sendResponse(res, 500, error);
  }
}


// purchase headDetail

export async function insertPurchaseHeadDetail(req, res) {
  const { error, value } = validateReq(insertPurchaseHeadDetailReq, req.body);
  if (error) {
    return sendResponse(res, 422, error.details);
  }
  const { head, details } = value;
  try {
    const insertedData = await insertIntoPurchaseHead(head);

    const buyersData = await Promise.all(
      details.map((d) => {
        const data = insertIntoPurchaseDetail({
          ...d,
          headId: insertedData.id,
        });
        return data;
      })
    );
    sendResponse(res, 200, { insertedData, buyersData });
  } catch (err) {
    sendResponse(res, 500, err);
  }
}

