import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  ArrowBack,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";

import { useColors } from "../../hooks/use-colors";
import CustomIconButton from "../../components/Buttons/CustomIconButton";
import {
  useDeleteIntoAccountMasterData,
  useInsertIntoAccountMasterData,
  useUpdateIntoAccountMasterData,
} from "../../hooks/accountMaster/accountMaster.mutation";
import AccountMasterRecords from "./AccountMasterRecords";
import MenuBar from "../menu/menuBar";
import { useIds } from "../IdsContext/IdsContext";
import { getAllGroupMasterData } from "../../api/groupMaster/groupMaster.request";
import { Link } from "react-router-dom";
import { getPurchaseData } from "../../api/purchase/purchase.request";
import { getPurchaseDetailData } from "../../api/purchase/purchaseDetail.request";
import { getSalesData } from "../../api/sales/sales.request";
import { getSalesDetailData } from "../../api/sales/salesDetail.request";
import { getServiceBillData } from "../../api/serviceBill/serviceBill.request";

const AccountMasterForm = ({ data }) => {
  const { ids } = useIds();
  // console.log(cids);

  const [accountData, setAccountData] = useState({
    accountName: "",
    accountType: "",
    address: "",
    cityCode: null,
    groupId: null,
    openingBalance: null,
    drcr: "",
    unregister: "",
    gstNo: "",
    fssiNo: "",
    stateCode: "",
    bankAccountCode: "",
    bankName: "",
    branch: "",
    ifsc: "",
    whatsappNo: "",
    tdstcsApplicable: "",
    locked: "",
    email: "",
    ccEmail: "",
    mobileNo: "",
    tanNo: "",
    companyCode: null,
    createdBy: null,
    //   modifiedBy: "",
  });
  const [accountMasterId, setAccountmasterId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [redirectToAccountRecords, setRedirectToAccountRecords] =
    useState(false);

  const [groupMasterData, setGroupMasterData] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [selectedGroupName, setSelectedGroupName] = useState("");

  const handleInputData = (e) => {
    // const isNumeric = !isNaN(e.target.value);
    setAccountData({
      ...accountData,
      [e.target.name]: e.target.value,
      //[e.target.name]: isNumeric ? Number(e.target.value) : e.target.value,
    });
  };

  const handleAccountRecordsData = () => {
    console.log(data);
    setAccountData(data);
    setAccountmasterId(data.id);
  };

  const handleClick = () => {
    setRedirectToAccountRecords(true);
  };

  const handleClear = () => {
    setIsDisabled(!isDisabled);
    setAccountmasterId(null);
    setAccountData({
      accountName: "",
      accountType: "",
      address: "",
      cityCode: null,
      groupId: null,
      openingBalance: null,
      drcr: "",
      unregister: "",
      gstNo: "",
      fssiNo: "",
      stateCode: "",
      bankAccountCode: "",
      bankName: "",
      branch: "",
      ifsc: "",
      whatsappNo: "",
      tdstcsApplicable: "",
      locked: "",
      email: "",
      ccEmail: "",
      mobileNo: "",
      tanNo: "",
      //companyCode: null,
    });
  };

  const insertAccountMasterMutation = useInsertIntoAccountMasterData();

  function handleInsertAccountMasterData() {
    insertAccountMasterMutation.mutate({
      ...accountData,
      companyCode: ids.companyId,
      createdBy: ids.userId,
      groupId: selectedGroupId,
    });
    setIsDisabled(!isDisabled);
    setAccountmasterId(null);
    setAccountData({
      accountName: "",
      accountType: "",
      address: "",
      cityCode: null,
      groupId: null,
      openingBalance: null,
      drcr: "",
      unregister: "",
      gstNo: "",
      fssiNo: "",
      stateCode: "",
      bankAccountCode: "",
      bankName: "",
      branch: "",
      ifsc: "",
      whatsappNo: "",
      tdstcsApplicable: "",
      locked: "",
      email: "",
      ccEmail: "",
      mobileNo: "",
      tanNo: "",
      //companyCode: null,
    });
    setManageButton({
      create: false,
      save: true,
      delete: false,
      update: false,
      cancel: false,
      edit: false,
    });
  }
  const updateAccountMasterMutation = useUpdateIntoAccountMasterData();

  function handleUpdateAccountMasterData() {
    updateAccountMasterMutation.mutate(accountData);
    setIsDisabled(!isDisabled);
    setAccountmasterId(null);
    setAccountData({
      accountName: "",
      accountType: "",
      address: "",
      cityCode: null,
      groupId: null,
      openingBalance: null,
      drcr: "",
      unregister: "",
      gstNo: "",
      fssiNo: "",
      stateCode: "",
      bankAccountCode: "",
      bankName: "",
      branch: "",
      ifsc: "",
      whatsappNo: "",
      tdstcsApplicable: "",
      locked: "",
      email: "",
      ccEmail: "",
      mobileNo: "",
      tanNo: "",
      //companyCode: null,
    });
    setManageButton({
      create: false,
      save: true,
      delete: false,
      update: false,
      cancel: false,
      edit: false,
    });
  }
  const deleteAccountMasterMutation = useDeleteIntoAccountMasterData();

  async function checkIfUseInPurchaseHead(accountMasterId) {
    try {
      const purchaseData = await getPurchaseData(accountMasterId);
      console.log("purchaseData", purchaseData);
      return purchaseData.length > 0;
    } catch (error) {
      console.error("Failed to fetch Purchase Head data:", error);
      return false;
    }
  }

  async function checkIfUseInPurchaseDetail(accountMasterId) {
    try {
      const purchaseDetailData = await getPurchaseDetailData(accountMasterId);
      console.log("purchaseDetailData", purchaseDetailData);
      return purchaseDetailData.length > 0;
    } catch (error) {
      console.error("Failed to fetch Purchase Detail data:", error);
      return false;
    }
  }

  async function checkIfUseInSalesHead(accountMasterId) {
    try {
      const salesData = await getSalesData(accountMasterId);
      console.log("salesData", salesData);
      return salesData.length > 0;
    } catch (error) {
      console.error("Failed to fetch Sales Head data:", error);
      return false;
    }
  }

  async function checkIfUseInSalesDetail(accountMasterId) {
    try {
      const salesDetailData = await getSalesDetailData(accountMasterId);
      console.log("salesDetailData", salesDetailData);
      return salesDetailData.length > 0;
    } catch (error) {
      console.error("Failed to fetch Sales Detail data:", error);
      return false;
    }
  }

  async function checkIfUseInServiceHead(accountMasterId) {
    try {
      const serviceData = await getServiceBillData(accountMasterId);
      console.log("serviceData", serviceData);
      return serviceData.length > 0;
    } catch (error) {
      console.error("Failed to fetch Sales Head data:", error);
      return false;
    }
  }

  function handleDeleteAccountMasterData() {
    try{

      const isInPurchase = checkIfUseInPurchaseHead(accountMasterId);
      if (isInPurchase) {
        alert(
          "Cannot delete the Account. It is associated with PurchaseHead."
        );
        return;
      }

      const isInPurchaseDetail = checkIfUseInPurchaseDetail(accountMasterId);
      if (isInPurchaseDetail) {
        alert(
          "Cannot delete the Account. It is associated with PurchaseDetail."
        );
        return;
      }

      const isInSales = checkIfUseInSalesHead(accountMasterId);
      if (isInSales) {
        alert(
          "Cannot delete the Account. It is associated with SalesHead."
        );
        return;
      }

      const isInSalesDetail = checkIfUseInSalesDetail(accountMasterId);
      if (isInSalesDetail) {
        alert(
          "Cannot delete the Account. It is associated with SalesDetail."
        );
        return;
      }

      const isInService = checkIfUseInServiceHead(accountMasterId);
      if (isInService) {
        alert(
          "Cannot delete the Account. It is associated with ServiceBill."
        );
        return;
      }

      deleteAccountMasterMutation.mutate({ id: accountMasterId });
      setIsDisabled(!isDisabled);
      setManageButton({
        create: false,
        save: true,
        delete: false,
        update: false,
        cancel: false,
        edit: false,
      });
      setAccountmasterId(null);
      setAccountData({
        accountName: "",
        accountType: "",
        address: "",
        cityCode: null,
        groupId: null,
        openingBalance: null,
        drcr: "",
        unregister: "",
        gstNo: "",
        fssiNo: "",
        stateCode: "",
        bankAccountCode: "",
        bankName: "",
        branch: "",
        ifsc: "",
        whatsappNo: "",
        tdstcsApplicable: "",
        locked: "",
        email: "",
        ccEmail: "",
        mobileNo: "",
        tanNo: "",
        //companyCode: null,
      });
    }catch(error){
      console.error("Failed to delete AccountMaster",error)
    }
  }

  const [manageButton, setManageButton] = useState({
    create: false,
    save: true,
    delete: false,
    update: false,
    cancel: false,
    edit: false,
  });

  const colors = useColors();

  useEffect(() => {
    const fetchGroupMasterData = async () => {
      try {
        // console.log("inside");
        const response = await getAllGroupMasterData();
        //console.log("hii", response.data);
        setGroupMasterData(response.data);
        if (response.data.length > 0) {
          setSelectedGroupId(response.data[0].id);
          setSelectedGroupName(response.data[0].groupName);
          //console.log(response.data[0].groupName)
        }
      } catch (error) {
        console.error("Failed to fetch group data:", error);
      }
    };
    fetchGroupMasterData();
  }, []);

  const handleGroupChange = (event) => {
    const selectedOptionId = event.target.value;
    const selectedOption = groupMasterData.find(
      (group) => group.id === selectedOptionId
    );

    if (selectedOption) {
      setSelectedGroupId(selectedOption.id);
      setSelectedGroupName(selectedOption.groupName);
    }
  };

  return (
    <>
      {redirectToAccountRecords ? (
        <AccountMasterRecords />
      ) : (
        <>
          <MenuBar />
          <Box
            sx={{
              bgcolor: colors.bgColor,
              width: "100%",
              height: "100%",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 18,
            }}
          >
            <Box
              sx={{
                bgcolor: colors.card,
                p: 2,
                borderRadius: 3,
                display: "flex",
              }}
            >
              <CustomIconButton
                color={colors.blue[500]}
                onClick={() => {
                  handleClick();
                }}
                description={"Go Back To AccountMaster Records"}
              >
                <Link to="/accountMasterRecords" style={{ color: "white" }}>
                  <ArrowBack />
                </Link>
              </CustomIconButton>

              <Typography
                sx={{
                  textTransform: "uppercase",
                  fontWeight: 500,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
                variant="h5"
              >
                AccountMaster Form
              </Typography>
            </Box>

            <Box
              sx={{
                bgcolor: colors.card,
                p: 2,
                borderRadius: 2,
                py: 2,
              }}
            >
              <Grid container spacing={3}>
                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter AccountMaster Id"
                    label="AccountMaster Id"
                    disabled
                    variant="outlined"
                    value={accountMasterId || ""}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter Account Name"
                    label="Account Name"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="accountName"
                    value={accountData.accountName || ""}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter Account Type"
                    label="Account Type"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="accountType"
                    value={accountData.accountType || ""}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter Address"
                    label="Address"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="address"
                    value={accountData.address || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter City Code"
                    label="City Code"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="cityCode"
                    value={accountData.cityCode ?? ""}
                    fullWidth
                    //InputLabelProps={{ shrink: length > 0 ? true : false }}
                  />
                </Grid>

                <Grid xs={12} sm={3} item>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel
                      required
                      id="groupId-label"
                      shrink={
                        groupMasterData.length > 0 || selectedGroupId
                          ? true
                          : false
                      }
                    >
                      Group Id
                    </InputLabel>
                    {selectedGroupId && (
                      <Select
                        labelId="groupId-label"
                        id="groupId"
                        label="Group Id"
                        disabled={isDisabled}
                        variant="outlined"
                        //onChange={handleInputData}
                        value={selectedGroupId}
                        {...console.log(selectedGroupId)}
                        onChange={handleGroupChange}
                      >
                        {groupMasterData.map((group) => (
                          <MenuItem key={group.id} value={group.id}>
                            {group.groupName}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter Opening Balance"
                    label="Opening Balance"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="openingBalance"
                    value={accountData.openingBalance ?? ""}
                    fullWidth
                    // InputLabelProps={{ shrink: length > 0 ? true : false }}
                  />
                </Grid>
                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter DRCR"
                    label="DRCR"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="drcr"
                    value={accountData.drcr || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter Unregister"
                    label="Unregister"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="unregister"
                    value={accountData.unregister || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter Gst Number"
                    label="GST Number"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="gstNo"
                    value={accountData.gstNo || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter Fssi Number"
                    label="FSSI Number"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="fssiNo"
                    value={accountData.fssiNo || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter State Code"
                    label="State Code"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="stateCode"
                    value={accountData.stateCode || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter Bank Account Code"
                    label="Bank Account Code"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="bankAccountCode"
                    value={accountData.bankAccountCode || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter Bank Name"
                    label="Bank Name"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="bankName"
                    value={accountData.bankName || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter Branch Name"
                    label="Branch Name"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="branch"
                    value={accountData.branch || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter Ifsc"
                    label="Ifsc Number"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="ifsc"
                    value={accountData.ifsc || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter WhatsApp Number"
                    label="WhatsApp Number"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="whatsappNo"
                    value={accountData.whatsappNo || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter tdstcsApplicable"
                    label="TdsTcsApplicable"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="tdstcsApplicable"
                    value={accountData.tdstcsApplicable || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter Locked"
                    label="Locked"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="locked"
                    value={accountData.locked || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter Email"
                    label="Email"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="email"
                    value={accountData.email || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter ccEmail"
                    label="ccEmail"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="ccEmail"
                    value={accountData.ccEmail || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter Mobile Number"
                    label="Mobile Number"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="mobileNo"
                    value={accountData.mobileNo || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter Tan Number"
                    label="Tan Number"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="tanNo"
                    value={accountData.tanNo || ""}
                    fullWidth
                  />
                </Grid>
                {/* <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter Company Code"
                    label="Company Code"
                    disabled
                    variant="outlined"
                    //onChange={setAccountmasterCompanyCode(companyData.id)}
                    //onChange={handleInputData}
                    //name="companyCode"
                    value={accountMasterCompanyCode}
                    fullWidth
                    required
                  />
                </Grid> */}
              </Grid>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                bgcolor: colors.card,
                borderRadius: 2,
              }}
            >
              <Box display="flex" gap={2}>
                <Button
                  disabled={manageButton.create}
                  onClick={() => {
                    //console.log(cid);
                    // setAccountmasterCompanyCode(cid);
                    setIsDisabled(!isDisabled);
                    setManageButton({
                      create: true,
                      save: false,
                      edit: true,
                      update: true,
                      delete: true,
                      cancel: false,
                    });
                  }}
                  color="green"
                  variant="contained"
                >
                  Add
                </Button>
                <Button
                  disabled={manageButton.save}
                  onClick={() => {
                    handleInsertAccountMasterData();
                    setIsDisabled(!isDisabled);
                  }}
                  color="green"
                  variant="contained"
                >
                  Save
                </Button>

                <Button
                  disabled={manageButton.edit}
                  onClick={() => {
                    setIsDisabled(!isDisabled);
                    handleAccountRecordsData();
                    setManageButton({
                      create: true,
                      save: true,
                      edit: true,
                      update: false,
                      delete: false,
                      cancel: false,
                      editCompanyId: true,
                    });
                  }}
                  color="blue"
                  variant="contained"
                >
                  Edit
                </Button>

                <Button
                  disabled={manageButton.update}
                  onClick={() => {
                    handleUpdateAccountMasterData();
                  }}
                  color="violet"
                  variant="contained"
                >
                  Update
                </Button>

                <Button
                  disabled={manageButton.delete}
                  onClick={() => {
                    setIsDisabled(isDisabled);
                    handleDeleteAccountMasterData();
                  }}
                  color="red"
                  variant="contained"
                >
                  Delete
                </Button>

                <Button
                  onClick={() => {
                    handleClear();
                    setManageButton({
                      create: false,
                      save: true,
                      delete: false,
                      update: false,
                      cancel: false,
                      edit: false,
                    });
                  }}
                  variant="contained"
                >
                  Clear
                </Button>
              </Box>

              <Box display="flex" gap={2}>
                <CustomIconButton
                  onClick={() => {}}
                  description={"Go To First"}
                  color={colors.blue[400]}
                >
                  <KeyboardDoubleArrowLeft sx={{ fontSize: "28px" }} />
                </CustomIconButton>

                <CustomIconButton
                  onClick={() => {}}
                  description={"Go To Prev"}
                  color={colors.blue[300]}
                >
                  <KeyboardArrowLeft sx={{ fontSize: "28px" }} />
                </CustomIconButton>
                <CustomIconButton
                  onClick={() => {}}
                  description={"Go To Next"}
                  color={colors.blue[300]}
                >
                  <KeyboardArrowRight sx={{ fontSize: "28px" }} />
                </CustomIconButton>

                <CustomIconButton
                  onClick={() => {}}
                  description={"Go To Last"}
                  color={colors.blue[400]}
                >
                  <KeyboardDoubleArrowRight sx={{ fontSize: "28px" }} />
                </CustomIconButton>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default AccountMasterForm;
