import Joi from "joi";

export const insertHeadDetailReq = Joi.object({
  head: Joi.object({
    billNo: Joi.number().required(),
    billDate: Joi.date().required(),
    accountCode: Joi.number().required(),
    accountId: Joi.number().required(),
    vehicleNo: Joi.string().max(10).required(),
    ewayNo: Joi.string().required(),
    taxable: Joi.number().required(),
    exps: Joi.number().required(),
    GST: Joi.string().min(15).max(15).allow(null, ""),
    amt: Joi.number().required(),
    yearCode: Joi.number().required(),
    companyCode: Joi.number().required(),
    createdBy: Joi.string().required(),
    modifiedBy: Joi.string().allow(null, ""),
  }),
  details: Joi.array()
    .items(
      Joi.object({
        itemCode: Joi.number().required(),
        ic: Joi.number().required(),
        brandCode: Joi.number().required(),
        bc: Joi.number().required(),
        quantity: Joi.number().required(),
        rate: Joi.number().required(),
        price: Joi.number().required(),
        srno: Joi.number().required(),
      })
    )
    .min(1)
    .required(),
});

export const deleteHeadDetailReq = Joi.object({
  head: Joi.object({
    id: Joi.array().items(Joi.number().required()),
  }),
});

export const getHeadDetailReq = Joi.object({
  head: Joi.object({
    id: Joi.array().items(Joi.number().required()),
  }),
});

export const modifyHeadDetailReq = Joi.object({
  head: Joi.object({
    id: Joi.number().required(),
    billNo: Joi.number().required(),
    billDate: Joi.date().required(),
    accountCode: Joi.number().required(),
    accountId: Joi.number().required(),
    vehicleNo: Joi.string().max(10).required(),
    ewayNo: Joi.string().required(),
    taxable: Joi.number().required(),
    exps: Joi.number().required(),
    GST: Joi.string().min(15).max(15).allow(null, ""),
    amt: Joi.number().required(),
    yearCode: Joi.number().required(),
    companyCode: Joi.number().required(),
    createdBy: Joi.string().allow(null, ""),
    modifiedBy: Joi.string().required(),
  }),
  detail: Joi.object({
    delete: Joi.object({
      detailIds: Joi.array().items(Joi.number().required()).required(),
    }),
    insert: Joi.array().items(
      Joi.object({
        headId: Joi.number().required(),
        itemCode: Joi.number().required(),
        ic: Joi.number().required(),
        brandCode: Joi.number().required(),
        bc: Joi.number().required(),
        quantity: Joi.number().required(),
        rate: Joi.number().required(),
        price: Joi.number().required(),
        srno: Joi.number().required(),
      })
    ),
    update: Joi.array().items(
      Joi.object({
        detailId: Joi.number().required(),
        itemCode: Joi.number().required(),
        ic: Joi.number().required(),
        brandCode: Joi.number().required(),
        bc: Joi.number().required(),
        quantity: Joi.number().required(),
        rate: Joi.number().required(),
        price: Joi.number().required(),
        srno: Joi.number().required(),
      })
    ),
  }),
}).required();

// ExpiryMaster

export const insertExpiryMasterReq = Joi.object({
  expiryDate: Joi.date().required(),
});

export const deleteExpiryMasterReq = Joi.object({
  id: Joi.number().required(),
});

export const updateExpiryMasterReq = Joi.object({
  id: Joi.number().required(),
  expiryDate: Joi.date().required(),
});

// Company

export const insertCompanyReq = Joi.object({
  companyName: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  mobile: Joi.string().min(0).allow(null, ""),
  gstNo: Joi.string().min(0).allow(null, ""),
  panNo: Joi.string().min(0).allow(null, ""),
  createdBy: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
  fssiNo: Joi.string().min(0).allow(null, ""),
  signPath: Joi.string().min(0).allow(null, ""),
  logoPath: Joi.string().min(0).allow(null, ""),
  stateCode: Joi.string().required(),
});

export const deleteCompanyReq = Joi.object({
  id: Joi.number().required(),
});

export const getCompanyReq = Joi.object({ id: Joi.number().required() });

export const updateCompanyReq = Joi.object({
  id: Joi.number().required(),
  companyName: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  mobile: Joi.string().min(0).allow(null, ""),
  gstNo: Joi.string().min(0).allow(null, ""),
  panNo: Joi.string().min(0).allow(null, ""),
  modifiedBy: Joi.number().allow(null, ""),
  fssiNo: Joi.string().min(0).allow(null, ""),
  signPath: Joi.string().min(0).allow(null, ""),
  logoPath: Joi.string().min(0).allow(null, ""),
  stateCode: Joi.string().required(),
});

// AccountMaster

export const insertAccountMasterReq = Joi.object({
  accountName: Joi.string().required(),
  accountType: Joi.string().required(),
  address: Joi.string().allow(null, ""),
  cityCode: Joi.number().allow(null, ""),
  groupId: Joi.number().required(),
  openingBalance: Joi.number().allow(null, ""),
  drcr: Joi.string().allow(null, ""),
  unregister: Joi.string().allow(null, ""),
  gstNo: Joi.string().allow(null, ""),
  fssiNo: Joi.string().allow(null, ""),
  stateCode: Joi.string().allow(null, ""),
  bankAccountCode: Joi.string().allow(null, ""),
  bankName: Joi.string().allow(null, ""),
  branch: Joi.string().allow(null, ""),
  ifsc: Joi.string().allow(null, ""),
  whatsappNo: Joi.string().allow(null, ""),
  tdstcsApplicable: Joi.string().allow(null, ""),
  locked: Joi.string().allow(null, ""),
  email: Joi.string().allow(null, ""),
  ccEmail: Joi.string().allow(null, ""),
  mobileNo: Joi.string().allow(null, ""),
  tanNo: Joi.string().allow(null, ""),
  companyCode: Joi.number().required(),
  createdBy: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
});

export const deleteAccountMasterReq = Joi.object({
  id: Joi.number().required(),
});

export const updateAccountMasterReq = Joi.object({
  id: Joi.number().required(),
  accountName: Joi.string().required(),
  accountType: Joi.string().required(),
  address: Joi.string().allow(null, ""),
  cityCode: Joi.number().allow(null, ""),
  groupId: Joi.number().required(),
  openingBalance: Joi.number().allow(null, ""),
  drcr: Joi.string().allow(null, ""),
  unregister: Joi.string().allow(null, ""),
  gstNo: Joi.string().allow(null, ""),
  fssiNo: Joi.string().allow(null, ""),
  stateCode: Joi.string().allow(null, ""),
  bankAccountCode: Joi.string().allow(null, ""),
  bankName: Joi.string().allow(null, ""),
  branch: Joi.string().allow(null, ""),
  ifsc: Joi.string().allow(null, ""),
  whatsappNo: Joi.string().allow(null, ""),
  tdstcsApplicable: Joi.string().allow(null, ""),
  locked: Joi.string().allow(null, ""),
  email: Joi.string().allow(null, ""),
  ccEmail: Joi.string().allow(null, ""),
  mobileNo: Joi.string().allow(null, ""),
  tanNo: Joi.string().allow(null, ""),
  companyCode: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
});

// GroupMaster

export const insertGroupMasterReq = Joi.object({
  groupName: Joi.string().required(),
  groupType: Joi.string().valid("B", "P", "T").required(),
  groupOrder: Joi.number().required(),
  companyCode: Joi.number().required(),
  createdBy: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
});

export const deleteGroupMasterReq = Joi.object({
  id: Joi.number().required(),
});

export const updateGroupMasterReq = Joi.object({
  id: Joi.number().required(),
  groupName: Joi.string().required(),
  groupType: Joi.string().required(),
  groupOrder: Joi.number().required(),
  companyCode: Joi.number().required(),
  // createdBy: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
});

// GstRateMaster

export const insertGstRateMasterReq = Joi.object({
  gstName: Joi.string().required(),
  rate: Joi.number().required(),
  cGstRate: Joi.number().required(),
  sGstRate: Joi.number().required(),
  iGstRate: Joi.number().required(),
  companyCode: Joi.number().required(),
  createdBy: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
});

export const deleteGstRateMasterReq = Joi.object({
  id: Joi.number().required(),
});

export const updateGstRateMasterReq = Joi.object({
  id: Joi.number().required(),
  gstName: Joi.string().required(),
  rate: Joi.number().required(),
  cGstRate: Joi.number().required(),
  sGstRate: Joi.number().required(),
  iGstRate: Joi.number().required(),
  companyCode: Joi.number().required(),
  //createdBy: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
});

// StateMaster

export const insertStateMasterReq = Joi.object({
  cityName: Joi.string().required(),
  pinCode: Joi.string().allow(null, ""),
  subArea: Joi.string().allow(null, ""),
  state: Joi.string().allow(null, ""),
  stateCode: Joi.string().required(),
  companyCode: Joi.number().required(),
  createdBy: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
});

export const deleteStateMasterReq = Joi.object({
  id: Joi.number().required(),
});

export const updateStateMasterReq = Joi.object({
  id: Joi.number().required(),
  cityName: Joi.string().required(),
  pinCode: Joi.string().allow(null, ""),
  subArea: Joi.string().allow(null, ""),
  state: Joi.string().allow(null, ""),
  stateCode: Joi.string().required(),
  companyCode: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
});

// ScriptMaster

export const insertScriptMasterReq = Joi.object({
  scriptName: Joi.string().required(),
  scriptType: Joi.string().valid("E", "F", "C").required(),
  lotSize: Joi.number().required(),
  faceValue: Joi.number().required(),
  scriptId: Joi.string().required(),
  isinNo: Joi.string().required(),
  createdBy: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
});

export const deleteScriptMasterReq = Joi.object({
  id: Joi.number().required(),
});

export const updateScriptMasterReq = Joi.object({
  id: Joi.number().required(),
  scriptName: Joi.string().required(),
  scriptType: Joi.string().valid("E", "F", "C").required(),
  lotSize: Joi.number().required(),
  faceValue: Joi.number().required(),
  scriptId: Joi.string().required(),
  isinNo: Joi.string().required(),
  modifiedBy: Joi.number().allow(null, ""),
});

// ItemMaster

export const insertItemMasterReq = Joi.object({
  itemCode: Joi.number().required(),
  itemName: Joi.string().required(),
  openingStock: Joi.number().allow(null, ""),
  wtPer: Joi.number().allow(null, ""),
  hsnNo: Joi.string().allow(null, ""),
  gstCode: Joi.number().required(),
  isService: Joi.string().required(),
  openingValue: Joi.number().allow(null, ""),
  ratePer: Joi.string().allow(null, ""),
  reverseCalculation: Joi.string().allow(null, ""),
  companyCode: Joi.number().required(),
  purchaseAccount: Joi.number().required(),
  pa: Joi.number().required(),
  sellAccount: Joi.number().required(),
  sa: Joi.number().required(),
  createdBy: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
});

export const deleteItemMasterReq = Joi.object({
  id: Joi.number().required(),
});

export const updateItemMasterReq = Joi.object({
  id: Joi.number().required(),
  itemCode: Joi.number().required(),
  itemName: Joi.string().required(),
  openingStock: Joi.number().allow(null, ""),
  wtPer: Joi.number().allow(null, ""),
  hsnNo: Joi.string().allow(null, ""),
  gstCode: Joi.number().required(),
  isService: Joi.string().required(),
  openingValue: Joi.number().allow(null, ""),
  ratePer: Joi.string().allow(null, ""),
  reverseCalculation: Joi.string().allow(null, ""),
  companyCode: Joi.number().required(),
  purchaseAccount: Joi.number().required(),
  pa: Joi.number().required(),
  sellAccount: Joi.number().required(),
  sa: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
});

// Users

export const insertUsersReq = Joi.object({
  userName: Joi.string().required(),
  userId: Joi.string().required(),
  userPassword: Joi.string().required(),
  emailAddress: Joi.string().allow(null, ""),
  emailPassword: Joi.string().allow(null, ""),
  mobileNo: Joi.string().allow(null, ""),
  userType: Joi.string().required(),
  userCategory: Joi.string().allow(null, ""),
  companyCode: Joi.number().required(),
  createdBy: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
});

export const deleteUsersReq = Joi.object({
  id: Joi.number().required(),
});

export const updateUsersReq = Joi.object({
  id: Joi.number().required(),
  userName: Joi.string().required(),
  userId: Joi.string().required(),
  emailAddress: Joi.string().allow(null, ""),
  emailPassword: Joi.string().allow(null, ""),
  mobileNo: Joi.string().allow(null, ""),
  userType: Joi.string().required(),
  userCategory: Joi.string().allow(null, ""),
  companyCode: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
});

// UserForms

export const insertUserFormsReq = Joi.object({
  userId: Joi.number().required(),
  formName: Joi.string().required(),
});

export const deleteUserFormsReq = Joi.object({
  id: Joi.number().required(),
});

export const updateUserFormsReq = Joi.object({
  id: Joi.number().required(),
  userId: Joi.number().required(),
  formName: Joi.string().required(),
});

// AccountingYear

export const insertAccountingYearReq = Joi.object({
  // fromDate: Joi.date().optional,
  toDate: Joi.date().allow(null, ""),
  companyCode: Joi.number().allow(null, ""),
});

export const deleteAccountingYearReq = Joi.object({
  id: Joi.number().required(),
});

export const updateAccountingYearReq = Joi.object({
  id: Joi.number().required(),
  //fromDate: Joi.date().optional,
  toDate: Joi.date().allow(null, ""),
  companyCode: Joi.number().allow(null, ""),
});

//Purchase Head

export const insertPurchaseHeadReq = Joi.object({
  // id: Joi.number().required(),
  cashCredit: Joi.string().allow(null, ""),
  docNo: Joi.number().allow(null, ""),
  docDate: Joi.date().allow(null, ""),
  accountCode: Joi.number().allow(null, ""),
  broker: Joi.number().allow(null, ""),
  LRNo: Joi.string().allow(null, ""),
  truckNo: Joi.string().allow(null, ""),
  taxableAmount: Joi.number().allow(null, ""),
  CGSTAmount: Joi.number().allow(null, ""),
  SGSTAmount: Joi.number().allow(null, ""),
  IGSTAmount: Joi.number().allow(null, ""),
  postage: Joi.number().allow(null, ""),
  amount: Joi.number().allow(null, ""),
  TCSPar: Joi.number().allow(null, ""),
  TCSAmount: Joi.number().allow(null, ""),
  companyCode: Joi.number().allow(null, ""),
  yearCode: Joi.number().allow(null, ""),
  createdBy: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
  billNo: Joi.string().allow(null, ""),
  ac: Joi.number().allow(null, ""),
  bc: Joi.number().allow(null, ""),
  TDSRate: Joi.number().allow(null, ""),
  TDSAmount: Joi.number().allow(null, ""),
  frieghtPerQntl: Joi.number().allow(null, ""),
});

export const deletePurchaseHeadReq = Joi.object({
  id: Joi.number().required(),
});

export const updatePurchaseHeadReq = Joi.object({
  id: Joi.number().required(),
  cashCredit: Joi.string().allow(null, ""),
  docNo: Joi.number().allow(null, ""),
  docDate: Joi.date().allow(null, ""),
  accountCode: Joi.number().allow(null, ""),
  broker: Joi.number().allow(null, ""),
  LRNo: Joi.string().allow(null, ""),
  truckNo: Joi.string().allow(null, ""),
  taxableAmount: Joi.number().allow(null, ""),
  CGSTAmount: Joi.number().allow(null, ""),
  SGSTAmount: Joi.number().allow(null, ""),
  IGSTAmount: Joi.number().allow(null, ""),
  postage: Joi.number().allow(null, ""),
  amount: Joi.number().allow(null, ""),
  TCSPar: Joi.number().allow(null, ""),
  TCSAmount: Joi.number().allow(null, ""),
  companyCode: Joi.number().allow(null, ""),
  yearCode: Joi.number().allow(null, ""),
  // createdBy: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
  billNo: Joi.string().allow(null, ""),
  ac: Joi.number().allow(null, ""),
  bc: Joi.number().allow(null, ""),
  TDSRate: Joi.number().allow(null, ""),
  TDSAmount: Joi.number().allow(null, ""),
  frieghtPerQntl: Joi.number().allow(null, ""),
});

//Purchase Detail

export const insertPurchaseDetailReq = Joi.object({
  psId: Joi.number().allow(null, ""),
  itemCode: Joi.number().allow(null, ""),
  quantity: Joi.number().allow(null, ""),
  rate: Joi.number().allow(null, ""),
  value: Joi.number().allow(null, ""),
  gstId: Joi.number().allow(null, ""),
  CGSTAmount: Joi.number().allow(null, ""),
  SGSTAmount: Joi.number().allow(null, ""),
  IGSTAmount: Joi.number().allow(null, ""),
  companyCode: Joi.number().allow(null, ""),
  yearCode: Joi.number().allow(null, ""),
  createdBy: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
  ic: Joi.number().allow(null, ""),
  purchaseAc: Joi.number().allow(null, ""),
  pac: Joi.number().allow(null, ""),
});

export const deletePurchaseDetailReq = Joi.object({
  id: Joi.number().required(),
});

export const updatePurchaseDetailReq = Joi.object({
  //id: Joi.number().required(),
  psId: Joi.number().allow(null, ""),
  itemCode: Joi.number().allow(null, ""),
  quantity: Joi.number().allow(null, ""),
  rate: Joi.number().allow(null, ""),
  value: Joi.number().allow(null, ""),
  gstId: Joi.number().allow(null, ""),
  CGSTAmount: Joi.number().allow(null, ""),
  SGSTAmount: Joi.number().allow(null, ""),
  IGSTAmount: Joi.number().allow(null, ""),
  companyCode: Joi.number().allow(null, ""),
  yearCode: Joi.number().allow(null, ""),
  modifiedBy: Joi.number().allow(null, ""),
  ic: Joi.number().allow(null, ""),
  purchaseAc: Joi.number().allow(null, ""),
  pac: Joi.number().allow(null, ""),
});

//gledger
export const insertGLedgerReq = Joi.object({
  transactionType: Joi.string().allow(null, ""),
  cashCredit: Joi.string().allow(null, ""),
  docNo: Joi.number().required(),
  docDate: Joi.date().allow(null, ""),
  accountCode: Joi.number().allow(null, ""),
  ac: Joi.number().allow(null, ""),
  narration: Joi.string().allow(null, ""),
  amount: Joi.number().allow(null, ""),
  companyCode: Joi.number().required(),
  yearCode: Joi.number().required(),
  orderCode: Joi.number().required(),
  DRCR: Joi.string().allow(null, ""),
  DRCRHead: Joi.number().allow(null, ""),
  progId: Joi.number().allow(null, ""),
});

export const updateGLedgerReq = Joi.object({
  transactionType: Joi.string().allow(null, ""),
  cashCredit: Joi.string().allow(null, ""),
  docNo: Joi.number().required(),
  docDate: Joi.date().allow(null, ""),
  accountCode: Joi.number().allow(null, ""),
  ac: Joi.number().allow(null, ""),
  narration: Joi.string().allow(null, ""),
  amount: Joi.number().allow(null, ""),
  companyCode: Joi.number().required(),
  yearCode: Joi.number().required(),
  orderCode: Joi.number().required(),
  DRCR: Joi.string().allow(null, ""),
  DRCRHead: Joi.number().allow(null, ""),
  progId: Joi.number().allow(null, ""),
});

//saleHead
export const insertSaleHeadReq = Joi.object({
  cashCredit: Joi.string().allow(null, ""),
  docNo: Joi.number().allow(null, ""),
  docDate: Joi.date().allow(null, ""),
  billTo: Joi.number().allow(null, ""),
  shipTo: Joi.number().allow(null, ""),
  broker: Joi.number().allow(null, ""),
  LRNo: Joi.string().allow(null, ""),
  truckNo: Joi.string().allow(null, ""),
  taxableAmount: Joi.number().allow(null, ""),
  CGSTAmount: Joi.number().allow(null, ""),
  SGSTAmount: Joi.number().allow(null, ""),
  IGSTAmount: Joi.number().allow(null, ""),
  postage: Joi.number().allow(null, ""),
  amount: Joi.number().allow(null, ""),
  TCSPar: Joi.number().allow(null, ""),
  TCSAmount: Joi.number().allow(null, ""),
  companyCode: Joi.number().allow(null, ""),
  yearCode: Joi.number().allow(null, ""),
  createdBy: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
  ac: Joi.number().allow(null, ""),
  bc: Joi.number().allow(null, ""),
  TDSRate: Joi.number().allow(null, ""),
  TDSAmount: Joi.number().allow(null, ""),
});

export const updateSaleHeadReq = Joi.object({
  id: Joi.number().required(),
  cashCredit: Joi.string().allow(null, ""),
  docNo: Joi.number().allow(null, ""),
  docDate: Joi.date().allow(null, ""),
  billTo: Joi.number().allow(null, ""),
  shipTo: Joi.number().allow(null, ""),
  broker: Joi.number().allow(null, ""),
  LRNo: Joi.string().allow(null, ""),
  truckNo: Joi.string().allow(null, ""),
  taxableAmount: Joi.number().allow(null, ""),
  CGSTAmount: Joi.number().allow(null, ""),
  SGSTAmount: Joi.number().allow(null, ""),
  IGSTAmount: Joi.number().allow(null, ""),
  postage: Joi.number().allow(null, ""),
  amount: Joi.number().allow(null, ""),
  TCSPar: Joi.number().allow(null, ""),
  TCSAmount: Joi.number().allow(null, ""),
  companyCode: Joi.number().allow(null, ""),
  yearCode: Joi.number().allow(null, ""),
  modifiedBy: Joi.number().allow(null, ""),
  ac: Joi.number().allow(null, ""),
  bc: Joi.number().allow(null, ""),
  TDSRate: Joi.number().allow(null, ""),
  TDSAmount: Joi.number().allow(null, ""),
});

export const deleteSaleHeadReq = Joi.object({
  id: Joi.number().required(),
});

//saleDetail

export const insertSaleDetailReq = Joi.object({
  sbId: Joi.number().allow(null, ""),
  itemCode: Joi.number().allow(null, ""),
  quantity: Joi.number().allow(null, ""),
  rate: Joi.number().allow(null, ""),
  value: Joi.number().allow(null, ""),
  gstId: Joi.number().allow(null, ""),
  SGSTAmount: Joi.number().allow(null, ""),
  CGSTAmount: Joi.number().allow(null, ""),
  IGSTAmount: Joi.number().allow(null, ""),
  companyCode: Joi.number().allow(null, ""),
  yearCode: Joi.number().allow(null, ""),
  createdBy: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
  ic: Joi.number().allow(null, ""),
  saleAc: Joi.number().allow(null, ""),
  sac: Joi.number().allow(null, ""),
});

export const updateSaleDetailReq = Joi.object({
  id: Joi.number().required(),
  sbId: Joi.number().allow(null, ""),
  itemCode: Joi.number().allow(null, ""),
  quantity: Joi.number().allow(null, ""),
  rate: Joi.number().allow(null, ""),
  value: Joi.number().allow(null, ""),
  gstId: Joi.number().allow(null, ""),
  SGSTAmount: Joi.number().allow(null, ""),
  CGSTAmount: Joi.number().allow(null, ""),
  IGSTAmount: Joi.number().allow(null, ""),
  companyCode: Joi.number().allow(null, ""),
  yearCode: Joi.number().allow(null, ""),
  modifiedBy: Joi.number().allow(null, ""),
  ic: Joi.number().allow(null, ""),
  saleAc: Joi.number().allow(null, ""),
  sac: Joi.number().allow(null, ""),
});

export const deleteSaleDetailReq = Joi.object({
  id: Joi.number().required(),
});

//serviceBillHead

export const insertServiceBillReq = Joi.object({
  docNo: Joi.number().allow(null, ""),
  date: Joi.date().allow(null, ""),
  cc: Joi.number().allow(null, ""),
  gstRateCode: Joi.number().allow(null, ""),
  billNo: Joi.string().allow(null, ""),
  subTotal: Joi.number().allow(null, ""),
  CGSTRate: Joi.number().allow(null, ""),
  CGSTAmount: Joi.number().allow(null, ""),
  SGSTRate: Joi.number().allow(null, ""),
  SGSTAmount: Joi.number().allow(null, ""),
  IGSTRate: Joi.number().allow(null, ""),
  IGSTAmount: Joi.number().allow(null, ""),
  Total: Joi.number().allow(null, ""),
  roundOff: Joi.number().allow(null, ""),
  finalAmount: Joi.number().allow(null, ""),
  isTDS: Joi.string().allow(null, ""),
  TDSPer: Joi.number().allow(null, ""),
  TDSAmount: Joi.number().allow(null, ""),
  TDS: Joi.number().allow(null, ""),
  companyCode: Joi.number().allow(null, ""),
  yearCode: Joi.number().allow(null, ""),
  createdBy: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
  TCSRate: Joi.number().allow(null, ""),
  TCSAmount: Joi.number().allow(null, ""),
  TCSNetPayable: Joi.number().allow(null, ""),
  einVoiceNo: Joi.string().allow(null, ""),
  ackNo: Joi.string().allow(null, ""),
  QRCode: Joi.string().allow(null, ""),
  isDeleted: Joi.number().allow(null, ""),
});

export const deleteServiceBillReq = Joi.object({
  id: Joi.number().required(),
});

export const updateServiceBillReq = Joi.object({
  docNo: Joi.number().allow(null, ""),
  date: Joi.date().allow(null, ""),
  cc: Joi.number().allow(null, ""),
  gstRateCode: Joi.number().allow(null, ""),
  subTotal: Joi.number().allow(null, ""),
  CGSTRate: Joi.number().allow(null, ""),
  CGSTAmount: Joi.number().allow(null, ""),
  SGSTRate: Joi.number().allow(null, ""),
  SGSTAmount: Joi.number().allow(null, ""),
  IGSTRate: Joi.number().allow(null, ""),
  IGSTAmount: Joi.number().allow(null, ""),
  Total: Joi.number().allow(null, ""),
  roundOff: Joi.number().allow(null, ""),
  finalAmount: Joi.number().allow(null, ""),
  isTDS: Joi.string().allow(null, ""),
  TDSPer: Joi.number().allow(null, ""),
  TDSAmount: Joi.number().allow(null, ""),
  TDS: Joi.number().allow(null, ""),
  companyCode: Joi.number().allow(null, ""),
  yearCode: Joi.number().allow(null, ""),
  modifiedBy: Joi.number().allow(null, ""),
  billNo: Joi.string().allow(null, ""),
  TCSRate: Joi.number().allow(null, ""),
  TCSAmount: Joi.number().allow(null, ""),
  TCSNetPayable: Joi.number().allow(null, ""),
  einVoiceNo: Joi.string().allow(null, ""),
  ackNo: Joi.string().allow(null, ""),
  QRCode: Joi.string().allow(null, ""),
  isDeleted: Joi.number().allow(null, ""),
});

//serviceBillDetail

export const insertServiceDetailReq = Joi.object({
  rbId: Joi.number().allow(null, ""),
  docNo: Joi.number().allow(null, ""),
  detailId: Joi.number().allow(null, ""),
  description: Joi.string().allow(null, ""),
  amount: Joi.number().allow(null, ""),
  ic: Joi.number().allow(null, ""),
  companyCode: Joi.number().allow(null, ""),
  yearCode: Joi.number().allow(null, ""),
  createdBy: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
  ic: Joi.number().allow(null, ""),
});

export const updateServiceDetailReq = Joi.object({
  id: Joi.number().required(),
  rbId: Joi.number().allow(null, ""),
  docNo: Joi.number().allow(null, ""),
  detailId: Joi.number().allow(null, ""),
  description: Joi.string().allow(null, ""),
  amount: Joi.number().allow(null, ""),
  ic: Joi.number().allow(null, ""),
  companyCode: Joi.number().allow(null, ""),
  yearCode: Joi.number().allow(null, ""),
  createdBy: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
  ic: Joi.number().allow(null, ""),
});

export const deleteServiceDetailReq = Joi.object({
  id: Joi.number().required(),
});

//Transaction Head
export const insertTransactionHeadReq = Joi.object({
  tranType: Joi.string().allow(null, ""),
  docNo: Joi.number().allow(null, ""),
  docDate: Joi.date().allow(null, ""),
  total: Joi.number().allow(null, ""),
  cb: Joi.number().allow(null, ""),
  companyCode: Joi.number().allow(null, ""),
  yearCode: Joi.number().allow(null, ""),
  createdBy: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
});

export const updateTransactionHeadReq = Joi.object({
  id: Joi.number().allow(null, ""),
  tranType: Joi.string().allow(null, ""),
  docNo: Joi.number().allow(null, ""),
  docDate: Joi.date().allow(null, ""),
  total: Joi.number().allow(null, ""),
  cb: Joi.number().allow(null, ""),
  companyCode: Joi.number().allow(null, ""),
  yearCode: Joi.number().allow(null, ""),
  createdBy: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
});

export const deleteTransactionHeadReq = Joi.object({
  id: Joi.number().required(),
});

//Transaction Detail

export const insertTransactionDetailReq = Joi.object({
  tranId: Joi.number().allow(null, ""),
  tranType: Joi.string().allow(null, ""),
  docNo: Joi.number().allow(null, ""),
  docDate: Joi.date().allow(null, ""),
  detailsId: Joi.number().allow(null, ""),
  amount: Joi.number().allow(null, ""),
  drcr: Joi.string().allow(null, ""),
  narration: Joi.string().allow(null, ""),
  ac: Joi.number().required(),
  companyCode: Joi.number().allow(null, ""),
  yearCode: Joi.number().allow(null, ""),
  createdBy: Joi.number().required(),
  modifiedBy: Joi.number().allow(null, ""),
});

export const updateTransactionDetailReq = Joi.object({
  id: Joi.number().required(),
  tranId: Joi.number().allow(null, ""),
  tranType: Joi.string().allow(null, ""),
  docNo: Joi.number().allow(null, ""),
  docDate: Joi.date().allow(null, ""),
  detailsId: Joi.number().allow(null, ""),
  amount: Joi.number().allow(null, ""),
  drcr: Joi.string().allow(null, ""),
  narration: Joi.string().allow(null, ""),
  ac: Joi.number().required(),
  companyCode: Joi.number().allow(null, ""),
  yearCode: Joi.number().allow(null, ""),
  modifiedBy: Joi.number().allow(null, ""),
});

export const deleteTransactionDetailReq = Joi.object({
  id: Joi.number().required(),
});

//purchase headDetail
export const insertPurchaseHeadDetailReq = Joi.object({
  head: Joi.object({
    cashCredit: Joi.string().allow(null, ""),
    docNo: Joi.number().allow(null, ""),
    docDate: Joi.date().allow(null, ""),
    accountCode: Joi.number().allow(null, ""),
    broker: Joi.number().allow(null, ""),
    LRNo: Joi.string().allow(null, ""),
    truckNo: Joi.string().allow(null, ""),
    taxableAmount: Joi.number().allow(null, ""),
    CGSTAmount: Joi.number().allow(null, ""),
    SGSTAmount: Joi.number().allow(null, ""),
    IGSTAmount: Joi.number().allow(null, ""),
    postage: Joi.number().allow(null, ""),
    amount: Joi.number().allow(null, ""),
    TCSPar: Joi.number().allow(null, ""),
    TCSAmount: Joi.number().allow(null, ""),
    companyCode: Joi.number().allow(null, ""),
    yearCode: Joi.number().allow(null, ""),
    createdBy: Joi.number().required(),
    modifiedBy: Joi.number().allow(null, ""),
    billNo: Joi.string().allow(null, ""),
    ac: Joi.number().allow(null, ""),
    bc: Joi.number().allow(null, ""),
    TDSRate: Joi.number().allow(null, ""),
    TDSAmount: Joi.number().allow(null, ""),
    frieghtPerQntl: Joi.number().allow(null, ""),
  }),
  details: Joi.array()
    .items(
      Joi.object({
        psId: Joi.number().allow(null, ""),
        itemCode: Joi.number().allow(null, ""),
        quantity: Joi.number().allow(null, ""),
        rate: Joi.number().allow(null, ""),
        value: Joi.number().allow(null, ""),
        gstId: Joi.number().allow(null, ""),
        CGSTAmount: Joi.number().allow(null, ""),
        SGSTAmount: Joi.number().allow(null, ""),
        IGSTAmount: Joi.number().allow(null, ""),
        companyCode: Joi.number().allow(null, ""),
        yearCode: Joi.number().allow(null, ""),
        createdBy: Joi.number().required(),
        modifiedBy: Joi.number().allow(null, ""),
        ic: Joi.number().allow(null, ""),
        purchaseAc: Joi.number().allow(null, ""),
        pac: Joi.number().allow(null, ""),
      })
    )
    .min(1)
    .required(),
});
