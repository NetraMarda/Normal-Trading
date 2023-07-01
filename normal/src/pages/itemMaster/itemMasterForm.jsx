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
import {
  useDeleteIntoItemMasterData,
  useInsertIntoItemMasterData,
  useUpdateIntoItemMasterData,
} from "../../hooks/itemMaster/itemMaster.mutation.js";
import { useColors } from "../../hooks/use-colors";
import CustomIconButton from "../../components/Buttons/CustomIconButton.jsx";
import ItemMasterRecords from "./itemMasterRecords.jsx";
import MenuBar from "../menu/menuBar.jsx";
import { useIds } from "../IdsContext/IdsContext.jsx";
import { getAllAccountMasterData } from "../../api/accountMaster/accountMaster.request.js";
import { getAllGstRateMasterData } from "../../api/gstRateMaster/gstRateMaster.request.js";
import { Link } from "react-router-dom";
import { getPurchaseDetailData } from "../../api/purchase/purchaseDetail.request.js";
import { getSalesDetailData } from "../../api/sales/salesDetail.request.js";

const itemMaster = ({ data }) => {
  const { ids } = useIds();

  const [itemMasterData, setItemMasterData] = useState({
    itemCode: "",
    itemName: "",
    openingStock: "",
    wtPer: "",
    hsnNo: "",
    gstCode: "",
    isService: "",
    openingValue: "",
    ratePer: "",
    reverseCalculation: "",
    companyCode: "",
    purchaseAccount: "",
    pa: "",
    sellAccount: "",
    sa: "",
    createdBy: null,
    modifiedBy: null,
  });

  const [itemMasterId, setItemMasterId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [redirectToItemMasterRecords, setRedirectToItemMasterRecords] =
    useState(false);

  const [accountMasterData, setAccountMasterData] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [selectedAccountName, setSelectedAccountName] = useState("");

  const [gstRateMasterData, setGstRateMasterData] = useState([]);
  const [selectedGstId, setSelectedGstId] = useState("");
  const [selectedGstName, setSelectedGstName] = useState("");

  const handleInputData = (e) => {
    setItemMasterData({ ...itemMasterData, [e.target.name]: e.target.value });
  };

  const handleItemMasterRecordsData = () => {
    setItemMasterData(data);
    setItemMasterId(data.id);
  };

  const handleClick = () => {
    setRedirectToItemMasterRecords(true);
  };

  const handleClear = () => {
    setIsDisabled(!isDisabled);
    setItemMasterId(null);
    setItemMasterData({
      id: "",
      itemCode: "",
      itemName: "",
      openingStock: "",
      wtPer: "",
      hsnNo: "",
      gstCode: "",
      isService: "",
      openingValue: "",
      ratePer: "",
      reverseCalculation: "",
      companyCode: "",
      purchaseAccount: "",
      pa: "",
      sellAccount: "",
      sa: "",
      createdBy: null,
      modifiedBy: null,
    });
  };

  const insertItemMasterMutation = useInsertIntoItemMasterData();

  function handleInsertItemMasterData() {
    insertItemMasterMutation.mutate({
      ...itemMasterData,
      companyCode: ids.companyId,
      createdBy: ids.userId,
      gstCode: selectedGstId,
      pa: selectedAccountId,
      sa: selectedAccountId,
    });
    setIsDisabled(!isDisabled);
    setItemMasterId(null);
    setItemMasterData({
      id: "",
      itemCode: "",
      itemName: "",
      openingStock: "",
      wtPer: "",
      hsnNo: "",
      gstCode: "",
      isService: "",
      openingValue: "",
      ratePer: "",
      reverseCalculation: "",
      companyCode: "",
      purchaseAccount: "",
      pa: "",
      sellAccount: "",
      sa: "",
      createdBy: null,
      modifiedBy: null,
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
  const updateItemMasterMutation = useUpdateIntoItemMasterData();

  function handleUpdateItemMasterData() {
    updateItemMasterMutation.mutate(itemMasterData);
    setIsDisabled(!isDisabled);
    setItemMasterId(null);
    setItemMasterData({
      id: "",
      itemCode: "",
      itemName: "",
      openingStock: "",
      wtPer: "",
      hsnNo: "",
      gstCode: "",
      isService: "",
      openingValue: "",
      ratePer: "",
      reverseCalculation: "",
      companyCode: "",
      purchaseAccount: "",
      pa: "",
      sellAccount: "",
      sa: "",
      createdBy: null,
      modifiedBy: null,
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
  const deleteItemMasterMutation = useDeleteIntoItemMasterData();

  async function checkIfUseInPurchaseDetail(itemMasterId) {
    try {
      const purchaseDetailData = await getPurchaseDetailData(itemMasterId);
      console.log("purchaseDetailData", purchaseDetailData);
      return purchaseDetailData.length > 0;
    } catch (error) {
      console.error("Failed to fetch Purchase Detail data:", error);
      return false;
    }
  }

  async function checkIfUseInSalesDetail(itemMasterId) {
    try {
      const salesDetailData = await getSalesDetailData(itemMasterId);
      console.log("salesDetailData", salesDetailData);
      return salesDetailData.length > 0;
    } catch (error) {
      console.error("Failed to fetch Sales Detail data:", error);
      return false;
    }
  }

  function handleDeleteItemMasterData() {
    try {
      const isInPurchaseDetail = checkIfUseInPurchaseDetail(itemMasterId);
      if (isInPurchaseDetail) {
        alert(
          "Cannot delete the ItemMaster. It is associated with PurchaseDetail."
        );
        return;
      }

      const isInSalesDetail = checkIfUseInSalesDetail(itemMasterId);
      if (isInSalesDetail) {
        alert("Cannot delete the ItemMaster. It is associated with SalesDetail.");
        return;
      }

      deleteItemMasterMutation.mutate({ id: itemMasterId });
      setIsDisabled(!isDisabled);
      setItemMasterId(null);
      setItemMasterData({
        id: "",
        itemCode: "",
        itemName: "",
        openingStock: "",
        wtPer: "",
        hsnNo: "",
        gstCode: "",
        isService: "",
        openingValue: "",
        ratePer: "",
        reverseCalculation: "",
        companyCode: "",
        purchaseAccount: "",
        pa: "",
        sellAccount: "",
        sa: "",
        createdBy: null,
        modifiedBy: null,
      });
      setManageButton({
        create: false,
        save: true,
        delete: false,
        update: false,
        cancel: false,
        edit: false,
      });
    } catch (error) {
      console.error("Failed to delete ItemMaster :", error);
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
    const fetchAccountMasterData = async () => {
      try {
        const response = await getAllAccountMasterData();
        setAccountMasterData(response.data);
        if (response.data.length > 0) {
          setSelectedAccountId(response.data[0].id);
          setSelectedAccountName(response.data[0].accountName);
        }
      } catch (error) {
        console.error("Failed to fetch account data:", error);
      }
    };

    fetchAccountMasterData();
  }, []);

  const handleAccountChange = (event) => {
    const selectedOptionId = event.target.value;
    const selectedOption = accountMasterData.find(
      (account) => account.id === selectedOptionId
    );

    if (selectedOption) {
      setSelectedAccountId(selectedOption.id);
      setSelectedAccountName(selectedOption.accountName);
    }
  };

  useEffect(() => {
    const fetchGstRateMasterData = async () => {
      try {
        const response = await getAllGstRateMasterData();
        setGstRateMasterData(response.data);
        if (response.data.length > 0) {
          setSelectedGstId(response.data[0].id);
          setSelectedGstName(response.data[0].gstName);
        }
      } catch (error) {
        console.error("Failed to fetch GST rate data:", error);
      }
    };

    fetchGstRateMasterData();
  }, []);

  const handleGstChange = (event) => {
    const selectedOptionId = event.target.value;
    const selectedOption = gstRateMasterData.find(
      (gst) => gst.id === selectedOptionId
    );

    if (selectedOption) {
      setSelectedGstId(selectedOption.id);
      setSelectedGstName(selectedOption.gstName);
    }
  };

  return (
    <>
      {redirectToItemMasterRecords ? (
        <ItemMasterRecords />
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
                p: 3,
                borderRadius: 3,
                display: "flex",
              }}
            >
              <CustomIconButton
                color={colors.blue[500]}
                onClick={() => {
                  handleClick();
                }}
                description={"Go Back To ItemMaster Records"}
              >
                <Link to="/itemMasterRecords" style={{ color: "white" }}>
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
                ItemMaster Form
              </Typography>
            </Box>

            <Box
              sx={{
                bgcolor: colors.card,
                p: 2,
                borderRadius: 2,
                py: 4,
              }}
            >
              <Grid container spacing={3}>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter ItemMaster Id"
                    label="ItemMaster Id"
                    disabled
                    variant="outlined"
                    value={itemMasterId || ""}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter ItemCode"
                    label="Item Code"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="itemCode"
                    value={itemMasterData.itemCode}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter ItemName"
                    label="Item Name"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="itemName"
                    value={itemMasterData.itemName || ""}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter Opening Stock"
                    label="Opening Stock"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="openingStock"
                    value={itemMasterData.openingStock || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter WtPer "
                    label=" WtPer"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name=" wtPer"
                    value={itemMasterData.wtPer || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter HSN No"
                    label="HSN No"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="hsnNo"
                    value={itemMasterData.hsnNo}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel
                      required
                      id="accountId-label"
                      shrink={
                        selectedAccountId || accountMasterData.length > 0
                          ? true
                          : false
                      }
                    >
                      pa
                    </InputLabel>
                    <Select
                      labelId="accountId-label"
                      id="pa"
                      label="pa"
                      disabled={isDisabled}
                      variant="outlined"
                      value={selectedAccountId}
                      onChange={handleAccountChange}
                    >
                      {accountMasterData.map((account) => (
                        <MenuItem key={account.id} value={account.id}>
                          {account.accountName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel
                      required
                      id="accountId-label"
                      shrink={
                        selectedAccountId || accountMasterData.length > 0
                          ? true
                          : false
                      }
                    >
                      sa
                    </InputLabel>
                    <Select
                      labelId="accountId-label"
                      id="sa"
                      label="sa"
                      disabled={isDisabled}
                      variant="outlined"
                      value={selectedAccountId}
                      onChange={handleAccountChange}
                    >
                      {accountMasterData.map((account) => (
                        <MenuItem key={account.id} value={account.id}>
                          {account.accountName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel
                      required
                      id="gstId-label"
                      shrink={selectedGstId || gstRateMasterData.length > 0}
                    >
                      GST Code
                    </InputLabel>
                    <Select
                      labelId="gstId-label"
                      id="gstCode"
                      label="GST Code"
                      disabled={isDisabled}
                      variant="outlined"
                      value={selectedGstId}
                      onChange={handleGstChange}
                    >
                      {gstRateMasterData.map((gst) => (
                        <MenuItem key={gst.id} value={gst.id}>
                          {gst.gstName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter IsService"
                    label="IsService"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="isService"
                    value={itemMasterData.isService || ""}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter Opening Value"
                    label="Opening Value"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="openingValue"
                    value={itemMasterData.openingValue || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter Rate Per"
                    label="Rate Per"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="ratePer"
                    value={itemMasterData.ratePer || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter Reverse Calculation"
                    label="Reverse Calculation"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="reverseCalculation"
                    value={itemMasterData.reverseCalculation || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter Purchase Account"
                    label="Purchase Account"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="purchaseAccount"
                    value={itemMasterData.purchaseAccount || ""}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter Sell Account"
                    label="Sell Account"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="sellAccount"
                    value={itemMasterData.sellAccount || ""}
                    fullWidth
                    required
                  />
                </Grid>
                {/* <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter SA"
                    label="SA"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="sa"
                    value={itemMasterData.sa || ""}
                    fullWidth
                    required
                  />
                </Grid> */}
                {/* <Grid xs={12} sm={4} item>
      <TextField
        placeholder="Enter createdBy"
        label="CreatedBy"
        for="createdBy"
        disabled={isDisabled}
        variant="outlined"
        onChange={handleInputData}
        name="createdBy"
        value={companyData.createdBy || ""}
        fullWidth
        required
      />
    </Grid>
    <Grid xs={12} sm={4} item>
      <TextField
        placeholder="Enter modifiedBy"
        label="ModifiedBy"
        disabled={isDisabled}
        variant="outlined"
        onChange={handleInputData}
        name="modifiedBy"
        value={companyData.modifiedBy || ""}
        fullWidth
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
                    handleInsertItemMasterData();
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
                    handleItemMasterRecordsData();
                    setManageButton({
                      create: true,
                      save: true,
                      edit: true,
                      update: false,
                      delete: false,
                      cancel: false,
                      editItemMasterId: true,
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
                    handleUpdateItemMasterData();
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
                    handleDeleteItemMasterData();
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

export default itemMaster;
