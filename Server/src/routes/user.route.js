import { Router } from "express";
import {
  modifyHeadDetail,
  insertHeadDetail,
  deleteHeadDetail,
  getHeadDetail,
  insertExpiryMaster,
  deleteExpiryMaster,
  getExpiryMaster,
  updateExpiryMaster,
  insertGstRateMaster,
  getGstRateMaster,
  deleteGstRateMaster,
  updateGstRateMaster,
  getCompany,
  insertCompany,
  deleteCompany,
  updateCompany,
  getGroupMaster,
  insertGroupMaster,
  deleteGroupMaster,
  updateGroupMaster,
  getStateMaster,
  insertStateMaster,
  deleteStateMaster,
  updateStateMaster,
  getScriptMaster,
  insertScriptMaster,
  deleteScriptMaster,
  updateScriptMaster,
  getItemMaster,
  insertItemMaster,
  deleteItemMaster,
  updateItemMaster,
  getUsers,
  insertUsers,
  deleteUsers,
  updateUsers,
  getUserForms,
  insertUserForms,
  deleteUserForms,
  updateUserForms,
  getAccountMaster,
  insertAccountMaster,
  deleteAccountMaster,
  updateAccountMaster,
  getAllCompanyData,
  getAllAccountData,
  getAllUsersData,
  getAccountingYear,
  insertAccountingYear,
  deleteAccountingYear,
  updateAccountingYear,
  getAllAccountingYearData,
  getPurchaseHead,
  insertPurchaseHead,
  deletePurchaseHead,
  updatePurchaseHead,
  getPurchaseDetail,
  insertPurchaseDetail,
  deletePurchaseDetail,
  updatePurchaseDetail,
  getAllPurchaseHeadData,
  getAllPurchaseDetailData,
  getAllGstRateMasterData,
  getAllStateMasterData,
  getAllItemMasterData,
  getAllGroupMastertData,
  getGLedger,
  insertGLedger,
  updateGLedger,
  getSaleHead,
  insertSaleHead,
  deleteSaleHead,
  updateSaleHead,
  getSaleDetail,
  insertSaleDetail,
  deleteSaleDetail,
  updateSaleDetail,
  getAllSaleHeadData,
  getAllSaleDetailData,
  getServiceHeadBill,
  insertServiceHeadBill,
  deleteServiceHeadBill,
  updateServiceHeadBill,
  getAllServiceHeadBillData,
  getServiceDetailBill,
  insertServiceDetailBill,
  deleteServiceDetailBill,
  updateServiceDetailBill,
  getAllServiceDetailBillData,
  getTransactionDetail,
  insertTransactionDetail,
  deleteTransactionDetail,
  updateTransactionDetail,
  getAllTransactionDetailData,
  getTransactionHead,
  insertTransactionHead,
  deleteTransactionHead,
  updateTransactionHead,
  getAllTransactionHeadData,
  getPaymentHead,
  insertPaymentHead,
  deletePaymentHead,
  updatePaymentHead,
  getAllPaymentHeadData,
  getPaymentDetail,
  insertPaymentDetail,
  deletePaymentDetail,
  updatePaymentDetail,
  getAllPaymentDetailData,
  insertPurchaseHeadDetail,
 // getTransactionMaxDocNo,
} from "../controller/user/user.controller.js";


const router = Router();

router.get("/head-detail", getHeadDetail);
router.post("/head-detail", insertHeadDetail);
router.post("/head-detail", deleteHeadDetail);
router.patch("/head-detail/queries", modifyHeadDetail);

router.post("/expiryMaster/insertQuery", insertExpiryMaster);
router.post("/expiryMaster/deleteQuery", deleteExpiryMaster);
router.get("/expiryMaster/selectQuery", getExpiryMaster);
router.patch("/expiryMaster/updateQuery", updateExpiryMaster);

router.get("/company/selectQuery/:id", getCompany);
router.post("/company/insertQuery", insertCompany);
router.post("/company/deleteQuery", deleteCompany);
router.patch("/company/updateQuery", updateCompany);
router.get("/company/selectAllQuery", getAllCompanyData);

router.get("/accountMaster/selectQuery/:id", getAccountMaster);
router.post("/accountMaster/insertQuery", insertAccountMaster);
router.post("/accountMaster/deleteQuery", deleteAccountMaster);
router.patch("/accountMaster/updateQuery", updateAccountMaster);
router.get("/accountMaster/selectAllQuery", getAllAccountData);

router.get("/groupMaster/selectQuery/:id", getGroupMaster);
router.post("/groupMaster/insertQuery", insertGroupMaster);
router.post("/groupMaster/deleteQuery", deleteGroupMaster);
router.patch("/groupMaster/updateQuery", updateGroupMaster);
router.get("/groupMaster/selectAllQuery", getAllGroupMastertData);

router.post("/gstRateMaster/insertQuery", insertGstRateMaster);
router.get("/gstRateMaster/selectQuery/:id", getGstRateMaster);
router.post("/gstRateMaster/deleteQuery", deleteGstRateMaster);
router.patch("/gstRateMaster/updateQuery", updateGstRateMaster);
router.get("/gstRateMaster/selectAllQuery", getAllGstRateMasterData);

router.get("/stateMaster/selectQuery/:id", getStateMaster);
router.post("/stateMaster/insertQuery", insertStateMaster);
router.post("/stateMaster/deleteQuery", deleteStateMaster);
router.patch("/stateMaster/updateQuery", updateStateMaster);
router.get("/stateMaster/selectAllQuery", getAllStateMasterData);

router.get("/scriptMaster/selectQuery", getScriptMaster);
router.post("/scriptMaster/insertQuery", insertScriptMaster);
router.post("/scriptMaster/deleteQuery", deleteScriptMaster);
router.patch("/scriptMaster/updateQuery", updateScriptMaster);
//router.get("/scriptMaster/selectAllQuery", getAllScriptMasterData);

router.get("/itemMaster/selectQuery/:id", getItemMaster);
router.post("/itemMaster/insertQuery", insertItemMaster);
router.post("/itemMaster/deleteQuery", deleteItemMaster);
router.patch("/itemMaster/updateQuery", updateItemMaster);
router.get("/itemMaster/selectAllQuery", getAllItemMasterData);

router.get("/users/selectQuery/:id", getUsers);
router.post("/users/insertQuery", insertUsers);
router.post("/users/deleteQuery", deleteUsers);
router.patch("/users/updateQuery", updateUsers);
router.get("/users/selectAllQuery", getAllUsersData)

router.get("/userForms/selectQuery", getUserForms);
router.post("/userForms/insertQuery", insertUserForms);
router.post("/userForms/deleteQuery", deleteUserForms);
router.patch("/userForms/updateQuery", updateUserForms);

router.get("/accountingYear/selectQuery/:id", getAccountingYear);
router.post("/accountingYear/insertQuery", insertAccountingYear);
router.post("/accountingYear/deleteQuery", deleteAccountingYear);
router.patch("/accountingYear/updateQuery", updateAccountingYear);
router.get("/accountingYear/selectAllQuery", getAllAccountingYearData)

router.get("/purchaseHead/selectQuery/:id", getPurchaseHead);
router.post("/purchaseHead/insertQuery", insertPurchaseHead);
router.post("/purchaseHead/deleteQuery", deletePurchaseHead);
router.patch("/purchaseHead/updateQuery", updatePurchaseHead);
router.get("/purchaseHead/selectAllQuery", getAllPurchaseHeadData)

router.get("/purchaseDetail/selectQuery/:id", getPurchaseDetail);
router.post("/purchaseDetail/insertQuery", insertPurchaseDetail);
router.post("/purchaseDetail/deleteQuery", deletePurchaseDetail);
router.patch("/purchaseDetail/updateQuery", updatePurchaseDetail);
router.get("/purchaseDetail/selectAllQuery", getAllPurchaseDetailData)


router.get("/gLedger/selectQuery/:id", getGLedger);
router.post("/gLedger/insertQuery", insertGLedger);
//router.post("/gLedger/deleteQuery", deleteGLedger);
router.patch("/gLedger/updateQuery", updateGLedger);

router.get("/salesHead/selectQuery/:id", getSaleHead);
router.post("/salesHead/insertQuery", insertSaleHead);
router.post("/salesHead/deleteQuery", deleteSaleHead);
router.patch("/salesHead/updateQuery", updateSaleHead);
router.get("/salesHead/selectAllQuery", getAllSaleHeadData);


router.get("/salesDetail/selectQuery/:id", getSaleDetail);
router.post("/salesDetail/insertQuery", insertSaleDetail);
router.post("/salesDetail/deleteQuery", deleteSaleDetail);
router.patch("/salesDetail/updateQuery", updateSaleDetail);
router.get("/salesDetail/selectAllQuery", getAllSaleDetailData);

router.get("/serviceBillHead/selectQuery/:id", getServiceHeadBill);
router.post("/serviceBillHead/insertQuery", insertServiceHeadBill);
router.post("/serviceBillHead/deleteQuery", deleteServiceHeadBill);
router.patch("/serviceBillHead/updateQuery", updateServiceHeadBill);
router.get("/serviceBillHead/selectAllQuery",getAllServiceHeadBillData);

router.get("/serviceBillDetail/selectQuery/:id", getServiceDetailBill);
router.post("/serviceBillDetail/insertQuery", insertServiceDetailBill);
router.post("/serviceBillDetail/deleteQuery", deleteServiceDetailBill);
router.patch("/serviceBillDetail/updateQuery", updateServiceDetailBill);
router.get("/serviceBillDetail/selectAllQuery",getAllServiceDetailBillData);

router.get("/transactionHead/selectQuery/:id", getTransactionHead);
router.post("/transactionHead/insertQuery", insertTransactionHead);
router.post("/transactionHead/deleteQuery", deleteTransactionHead);
router.patch("/transactionHead/updateQuery", updateTransactionHead);
router.get("/transactionHead/selectAllQuery",getAllTransactionHeadData);

router.get("/transactionDetail/selectQuery/:id", getTransactionDetail);
router.post("/transactionDetail/insertQuery", insertTransactionDetail);
router.post("/transactionDetail/deleteQuery", deleteTransactionDetail);
router.patch("/transactionDetail/updateQuery", updateTransactionDetail);
router.get("/transactionDetail/selectAllQuery",getAllTransactionDetailData);

router.get("/paymentHead/selectQuery/:id", getPaymentHead);
router.post("/paymentHead/insertQuery", insertPaymentHead);
router.post("/paymentHead/deleteQuery", deletePaymentHead);
router.patch("/paymentHead/updateQuery", updatePaymentHead);
router.get("/paymentHead/selectAllQuery",getAllPaymentHeadData);

router.get("/paymentDetail/selectQuery/:id", getPaymentDetail);
router.post("/paymentDetail/insertQuery", insertPaymentDetail);
router.post("/paymentDetail/deleteQuery", deletePaymentDetail);
router.patch("/paymentDetail/updateQuery", updatePaymentDetail);
router.get("/paymentDetail/selectAllQuery",getAllPaymentDetailData);


router.post("/purchasehead-detail/insert", insertPurchaseHeadDetail);
//router.post("/transaction",getTransactionMaxDocNo)

export default router;
