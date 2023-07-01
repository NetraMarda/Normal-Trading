import { Head } from "../models/head/head.model.js";
import { Details } from "../models/details/details.model.js";
import { logger } from "./index.js";
import { Company } from "../models/company/company.model.js";
import { GroupMaster } from "../models/groupMaster/groupMaster.model.js";
import { AccountMaster } from "../models/accountMaster/accountMaster.model.js";
import { ExpiryMaster } from "../models/expiryMaster/expiryMaster.model.js";
import { GstRateMaster } from "../models/gstRateMaster/gstRateMaster.model.js";
import { StateMaster } from "../models/stateMaster/stateMaster.model.js";
import { ScriptMaster } from "../models/scriptMaster/scriptMaster.model.js";
import { ItemMaster } from "../models/itemMaster/itemMaster.model.js";
import { Users } from "../models/users/users.model.js";
import { UserForms } from "../models/userForms/userForms.model.js";
import { AccountingYear } from "../models/accountingYear/accountingYear.model.js";
import { PurchaseHead } from "../models/purchaseHead/purchaseHead.model.js";
import { PurchaseDetail } from "../models/purchaseDetail/purchaseDetail.model.js";
import{SaleHead} from "../models/saleHead/saleHead.model.js"
import { GLedger, PaymentDetails, PaymentHead, SaleDetail,  ServiceBillDetail,  ServiceBillHead, TransactionDetails, TransactionHead } from "../models/index.js";

export async function sync() {
  const config = {
    freezeTableName: true,
    alter: false,
    force: false,
    logging: false,
  };
  try {
    await Head.sync(config);
  } catch (err) {
    logger.error("Failed to sync head" + " " + err);
  }
  try {
    await Details.sync(config);
  } catch (err) {
    logger.error("Failed to sync details" + " " + err);
  }
  try {
    await Company.sync(config);
  } catch (err) {
    logger.error("Failed to sync company" + " " + err);
  }
  try {
    await GroupMaster.sync(config);
  } catch (err) {
    logger.error("Failed to sync groupMaster" + " " + err);
  }
  try {
    await AccountMaster.sync(config);
  } catch (err) {
    logger.error("Failed to sync accountMaster" + " " + err);
  }
  try {
    await ExpiryMaster.sync(config);
  } catch (err) {
    logger.error("Failed to sync expiryMaster" + " " + err);
  }
  try {
    await GstRateMaster.sync(config);
  } catch (err) {
    logger.error("Failed to sync gstRateMaster" + " " + err);
  }
  try {
    await StateMaster.sync(config);
  } catch (err) {
    logger.error("Failed to sync stateMaster" + " " + err);
  }
  try {
    await ScriptMaster.sync(config);
  } catch (err) {
    logger.error("Failed to sync scriptMaster" + " " + err);
  }
  try {
    await ItemMaster.sync(config);
  } catch (err) {
    logger.error("Failed to sync itemMaster" + " " + err);
  }
  try {
    await Users.sync(config);
  } catch (err) {
    logger.error("Failed to sync users" + " " + err);
  }
  try {
    await UserForms.sync(config);
  } catch (err) {
    logger.error("Failed to sync userForm" + " " + err);
  }
  try {
    await AccountingYear.sync(config);
  } catch (err) {
    logger.error("Failed to sync accountingYear" + " " + err);
  }
  try {
    await PurchaseHead.sync(config);
  } catch (err) {
    logger.error("Failed to sync purchase Head" + " " + err);
  }
  try {
    await PurchaseDetail.sync(config);
  } catch (err) {
    logger.error("Failed to sync purchase Detail" + " " + err);
  }
  try {
    await SaleHead.sync(config);
  } catch (err) {
    logger.error("Failed to sync sale Head" + " " + err);
  }
  try {
    await SaleDetail.sync(config);
  } catch (err) {
    logger.error("Failed to sync sale Detail" + " " + err);
  }
  try {
    await GLedger.sync(config);
  } catch (err) {
    logger.error("Failed to sync gledger" + " " + err);
  }
  try {
    await ServiceBillHead.sync(config);
  } catch (err) {
    logger.error("Failed to sync service bill Head" + " " + err);
  }
  try {
    await ServiceBillDetail.sync(config);
  } catch (err) {
    logger.error("Failed to sync service bill Detail" + " " + err);
  }
  try {
    await TransactionDetails.sync(config);
  } catch (err) {
    logger.error("Failed to sync transaction Detail" + " " + err);
  }
  try {
    await TransactionHead.sync(config);
  } catch (err) {
    logger.error("Failed to sync transaction head" + " " + err);
  }
  try {
    await PaymentHead.sync(config);
  } catch (err) {
    logger.error("Failed to sync payment head" + " " + err);
  }
  try {
    await PaymentDetails.sync(config);
  } catch (err) {
    logger.error("Failed to sync payment Detail" + " " + err);
  }
  
}
