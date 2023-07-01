import { Route, Routes } from "react-router-dom";
import CompanyForm from "../pages/company/CompanyForm";
import CompanyRecords from "../pages/company/CompanyRecords";
import AccountMasterForm from "../pages/accountMaster/AccountMasterForm";
import AccountMasterRecords from "../pages/accountMaster/AccountMasterRecords";
import MenuBar from "../pages/menu/menuBar";
import CompanySelection from "../pages/companySelection/companySelectionRecord";
import ItemMasterForm from "../pages/itemMaster/itemMasterForm";
import ItemMasterRecords from "../pages/itemMaster/itemMasterRecords";
import StateMasterForm from "../pages/stateMaster/stateMasterForm";
import StateMasterRecords from "../pages/stateMaster/stateMasterRecords";
import GroupMasterForm from "../pages/groupMaster/groupMasterForm";
import GroupMasterRecords from "../pages/groupMaster/groupMasterRecords";
import GstRateMasterForm from "../pages/gstRateMaster/gstRateMasterForm"
import GstRateMasterRecords from "../pages/gstRateMaster/gstRateMasterRecords";
import PurchaseForm from "../pages/purchase/purchase";
import SalesForm from "../pages/sales/sales";
import ServiceBillForm from "../pages/serviceBill/serviceBill";
import JournalVourcherForm from "../pages/journalVoucher/journalVourcher";
import JournalVourcherRecords from "../pages/journalVoucher/journalVourcherRecords";
import PaymentForm from "../pages/payment/payment";
import PaymentRecords from "../pages/payment/paymentRecord";
import PurchaseReturnForm from "../pages/purchaseReturn/purchaseReturn";
import InvoiceForm from "../pages/invoice/invoice";
import GledgerReport from "../pages/reports/gledger";
import PurchaseLedger from "../pages/reports/purchaseLedger/purchaseLedger";
import SalesLedger from "../pages/reports/salesLedger/salesLedger";
import TrialBalanceReport from "../pages/reports/trialBalance/trialBalance";
import PurchaseRecords from "../pages/purchase/purchaseRecords";
import SalesRecords from "../pages/sales/salesRecords";
import ServiceBillRecords from "../pages/serviceBill/serviceBillRecords";
import InvoiceRecords from "../pages/invoice/invoiceRecords";
import PurchaseReturnRecords from "../pages/purchaseReturn/purchaseReturnRecords";

export const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="/menuBar" element={<MenuBar />} />
      <Route path="/companySelection" element={<CompanySelection />} />
      <Route path="/companyRecords" element={<CompanyRecords />} />
      <Route path="/companyForm" element={<CompanyForm />} />
      <Route path="/accountMasterRecords" element={<AccountMasterRecords />} />
      <Route path="/accountMasterForm" element={<AccountMasterForm />} />
      <Route path="/groupMasterForm" element={<GroupMasterForm/>}/>
      <Route path="/groupMasterRecords" element={<GroupMasterRecords/>}/>
      <Route path="/itemMasterForm" element={<ItemMasterForm />} />
      <Route path="/itemMasterRecords" element={<ItemMasterRecords />} />
      <Route path="/gstRateMasterForm" element={<GstRateMasterForm/>}/>
      <Route path="/gstRateMasterRecords" element={<GstRateMasterRecords/>}/>
      <Route path="/stateMasterForm" element={<StateMasterForm />} />
      <Route path="/stateMasterRecords" element={<StateMasterRecords />} />
      <Route path="/purchase" element={<PurchaseForm />} />
      <Route path="/purchaseRecords" element={<PurchaseRecords/>}/>
      <Route path="/purchaseReturn" element={<PurchaseReturnForm/>}/>
      <Route path="/purchaseReturnRecords" element={<PurchaseReturnRecords/>}/>
      <Route path="/invoice" element={<InvoiceForm/>}/>
      <Route path="/invoiceRecords" element={<InvoiceRecords/>}/>
      <Route path="/salesReturn" element={<SalesForm/>}/>
      <Route path="/salesRecords" element={<SalesRecords/>}/>
      <Route path="/serviceBill" element={<ServiceBillForm/>}/>
      <Route path="/serviceBillRecords" element={<ServiceBillRecords/>}/>
      <Route path="/journalVourcher" element={<JournalVourcherForm/>}/>
      <Route path="/journalVourcherRecords" element={<JournalVourcherRecords/>}/>
      <Route path="/payment" element={<PaymentForm/>}/>
      <Route path="/paymentRecords" element={<PaymentRecords/>}/>

      <Route path="/gledger" element={<GledgerReport/>}/>
      <Route path="/purchaseLedger" element={<PurchaseLedger/>}/>
      <Route path="/salesLedger" element={<SalesLedger/>}/>
      <Route path="/trialBalance" element={<TrialBalanceReport/>}/>
    </Routes>
  );
};
