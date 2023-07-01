import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableContainer,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import {
  ArrowBack,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useColors } from "../../hooks/use-colors";
import CustomIconButton from "../../components/Buttons/CustomIconButton";
import MenuBar from "../menu/menuBar";
import {
  useDeleteIntoPurchaseData,
  useInsertIntoPurchaseData,
  useUpdateIntoPurchaseData,
} from "../../hooks/purchase/purchase.mutation";
import { getAllPurchaseDetailData, getPurchaseDetailData } from "../../api/purchase/purchaseDetail.request";
import {
  useDeleteIntoPurchaseDetailData,
  useInsertIntoPurchaseDetailData,
  useUpdateIntoPurchaseDetailData,
} from "../../hooks/purchase/purchaseDetail.mutation";
import { useIds } from "../IdsContext/IdsContext";
import { getAllGstRateMasterData } from "../../api/gstRateMaster/gstRateMaster.request";
import { getAllItemMasterData } from "../../api/itemMaster/itemMaster.request";
import { getAllAccountMasterData } from "../../api/accountMaster/accountMaster.request";
import { getAllPurchaseData } from "../../api/purchase/purchase.request";
import { Link } from "react-router-dom";

const PurchaseReturnForm = ({ data }) => {
  const { ids, setIds } = useIds();

  const [purchaseData, setPurchaseData] = useState({
    tranType: "",
    cashCredit: "",
    docNo: null,
    docDate: "",
    accountCode: null,
    broker: null,
    LRNo: "",
    truckNo: "",
    taxableAmount: null,
    CGSTAmount: null,
    SGSTAmount: null,
    IGSTAmount: null,
    postage: null,
    amount: null,
    TCSPar: null,
    TCSAmount: null,
    companyCode: "",
    yearCode: null,
    createdBy: "",
    //modifiedBy: "",
    billNo: null,
    ac: null,
    bc: null,
    TDSRate: null,
    TDSAmount: null,
    frieghtPerQntl: null,
  });
  const [purchaseId, setPurchaseId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [redirectToPurchaseRecords, setRedirectToPurchaseRecords] =
    useState(false);

  const [purrecordData, setPurrecordData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [editedRowIndex, setEditedRowIndex] = useState(-1);
  const [newRecord, setNewRecord] = useState({});
  const [newRow, setNewRow] = useState({
    // id: '',
    itemCode: null,
    Qty: null,
    Rate: null,
    value: null,
    SGST: null,
    CGST: null,
    IGST: null,
    //yearCode: null,
  });
  const [showNewRow, setShowNewRow] = useState(false);

  const [gstRateMasterData, setGstRateMasterData] = useState([]);
  const [selectedGstRateMasterId, setSelectedGstRateMasterId] = useState("");
  const [selectedGstRateMasterName, setSelectedGstRateMasterName] =
    useState("");

  const [itemMasterData, setItemMasterData] = useState([]);
  const [selectedItemMasterId, setSelectedItemMasterId] = useState("");
  const [selectedItemMasterName, setSelectedItemMasterName] = useState("");

  const [accountMasterData, setAccountMasterData] = useState([]);
  const [accountData, setAccountData] = useState([]);
  const [selectedAccountMasterId, setSelectedAccountMasterId] = useState("");
  const [selectedAccountMasterName, setSelectedAccountMasterName] =
    useState("");
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [selectedAccountName, setSelectedAccountName] = useState("");

  const [purHeadData, setPurHeadData] = useState([]);
  const [selectedPurHeadId, setSelectedPurHeadId] = useState("");

  const [calDate, setCalDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  function openCalendar() {
    setOpen(true);
  }

  function closeCalendar() {
    setOpen(false);
  }

  function onDateChange(selectedDate) {
    setCalDate(selectedDate);
    closeCalendar();
  }

  const handleEdit = (index) => {
    setEditedRowIndex(index);
    setEditMode(true);
    // setEditedData(purrecordData[index]);
  };

  const handleInputData = (e) => {
    // const isNumeric = !isNaN(e.target.value);
    setPurchaseData({
      ...purchaseData,
      [e.target.name]: e.target.value,
      //[e.target.name]: isNumeric ? Number(e.target.value) : e.target.value,
    });
  };

  const handlePurchaseRecordsData = () => {
    setPurchaseData(data);
    setPurchaseId(data.id);
  };

  const handleClick = () => {
    setRedirectToPurchaseRecords(true);
  };

  const handleClear = () => {
    setIsDisabled(!isDisabled);
    setPurchaseId(null);
    setPurchaseData({
      tranType: "",
      cashCredit: "",
      docNo: null,
      docDate: "",
      accountCode: null,
      broker: null,
      LRNo: "",
      truckNo: "",
      taxableAmount: null,
      CGSTAmount: null,
      SGSTAmount: null,
      IGSTAmount: null,
      postage: null,
      amount: null,
      TCSPar: null,
      TCSAmount: null,
      //companyCode: "",
      //yearCode: null,
      //createdBy: "",
      //modifiedBy: "",
      billNo: null,
      ac: null,
      bc: null,
      TDSRate: null,
      TDSAmount: null,
      frieghtPerQntl: null,
    });
  };

  const [maxDocNo, setMaxDocNo] = useState();

  const fetchPurchaseData = async () => {
    try {
      const response = await getAllPurchaseData();
      const journalData = response.data;
      const docNos = journalData
        .map((item) => item.docNo)
        .filter((docNo) => docNo !== null);

      const maxDoc = Math.max(...docNos) + 1;
      setMaxDocNo(maxDoc);
    } catch (error) {
      console.error("Failed to fetch Purchase data:", error);
    }
  };

  useEffect(() => {
    fetchPurchaseData();
  }, []);

  const insertPurchaseMutation = useInsertIntoPurchaseData();

  function handleInsertPurchaseData() {
    insertPurchaseMutation.mutate(
      {
        ...purchaseData,
        companyCode: ids.companyId,
        yearCode: ids.accountingYearId,
        createdBy: ids.userId,
        ac: selectedAccountMasterId,
        bc: selectedAccountId,
        docNo: maxDocNo,
        docDate: calDate,
      },
      {
        onSuccess: () => {
          fetchPurchaseData();
        },
      }
    );
    setIsDisabled(!isDisabled);
    setManageButton({
      create: false,
      save: true,
      delete: false,
      update: false,
      cancel: false,
      edit: false,
    });
    setPurchaseId(null);
    setPurchaseData({
      tranType: "",
      cashCredit: "",
      docNo: null,
      docDate: "",
      accountCode: null,
      broker: null,
      LRNo: "",
      truckNo: "",
      taxableAmount: null,
      CGSTAmount: null,
      SGSTAmount: null,
      IGSTAmount: null,
      postage: null,
      amount: null,
      TCSPar: null,
      TCSAmount: null,
      //companyCode: "",
      // yearCode: null,
      //createdBy: "",
      //modifiedBy: "",
      billNo: null,
      ac: null,
      bc: null,
      TDSRate: null,
      TDSAmount: null,
      frieghtPerQntl: null,
    });
  }
  const updatePurchaseMutation = useUpdateIntoPurchaseData();

  function handleUpdatePurchaseData() {
    updatePurchaseMutation.mutate({
      ...purchaseData,
      companyCode: ids.companyId,
      yearCode: ids.accountingYearId,
      createdBy: ids.userId,
      ac: selectedAccountMasterId,
      bc: selectedAccountId,
    });
    setIsDisabled(!isDisabled);
    setPurchaseId(null);
    setPurchaseData({
      tranType: "",
      cashCredit: "",
      docNo: null,
      docDate: "",
      accountCode: null,
      broker: null,
      LRNo: "",
      truckNo: "",
      taxableAmount: null,
      CGSTAmount: null,
      SGSTAmount: null,
      IGSTAmount: null,
      postage: null,
      amount: null,
      TCSPar: null,
      TCSAmount: null,
      //companyCode: "",
      // yearCode: null,
      //createdBy: "",
      //modifiedBy: "",
      billNo: null,
      ac: null,
      bc: null,
      TDSRate: null,
      TDSAmount: null,
      frieghtPerQntl: null,
    });
  }
  const deletePurchaseMutation = useDeleteIntoPurchaseData();

  async function checkIfUseInPurchaseDetail(purchaseId) {
    try {
      const purchaseDetailData = await getPurchaseDetailData(purchaseId);
      console.log("purchaseDetailData", purchaseDetailData);
      return purchaseDetailData.length > 0;
    } catch (error) {
      console.error("Failed to fetch Purchase Detail data:", error);
      return false;
    }
  }

  function handleDeletePurchaseData() {
    try{
      const isInPurchaseDetail = checkIfUseInPurchaseDetail(id);
      if (isInPurchaseDetail) {
        alert(
          "Cannot delete the PurchaseReturnHead. It is associated with PurchaseDetail."
        );
        return;
      }

      deletePurchaseMutation.mutate({ id: purchaseId });
      setIsDisabled(!isDisabled);
      setPurchaseId(null);
      setPurchaseData({
        tranType: "",
        cashCredit: "",
        docNo: null,
        docDate: "",
        accountCode: null,
        broker: null,
        LRNo: "",
        truckNo: "",
        taxableAmount: null,
        CGSTAmount: null,
        SGSTAmount: null,
        IGSTAmount: null,
        postage: null,
        amount: null,
        TCSPar: null,
        TCSAmount: null,
        //companyCode: "",
        // yearCode: null,
        //createdBy: "",
        //modifiedBy: "",
        billNo: null,
        ac: null,
        bc: null,
        TDSRate: null,
        TDSAmount: null,
        frieghtPerQntl: null,
      });
    }catch(error){
      console.error("Failed to delete PurchaseReturn :",error)
    }
  }

  const insertPurchaseDetailMutation = useInsertIntoPurchaseDetailData();

  function handleInsertPurchaseDetailData() {
    insertPurchaseDetailMutation.mutate(
      {
        ...newRecord,
        psId: selectedPurHeadId,
        gstId: selectedGstRateMasterId,
        companyCode: ids.companyId,
        yearCode: ids.accountingYearId,
        createdBy: ids.userId,
        ic: selectedItemMasterId,
        purcac: selectedAccountMasterId,
        pac: selectedAccountId,
      },
      {
        onSuccess: (insertedData) => {
          console.log(insertedData);
          const updatedRowData = insertedData.data;
          console.log(updatedRowData);
          setPurrecordData((prevData) => [...prevData, updatedRowData]);
          setShowNewRow(!showNewRow);
        },
      }
    );
  }
  const updatePurchaseDetailMutation = useUpdateIntoPurchaseDetailData();

  function handleUpdatePurchaseDetailData() {
    updatePurchaseDetailMutation.mutate(
      {
        ...editedData,
        psId: selectedPurHeadId,
        gstId: selectedGstRateMasterId,
        companyCode: ids.companyId,
        yearCode: ids.accountingYearId,
        createdBy: ids.userId,
        ic: selectedItemMasterId,
        purcac: selectedAccountMasterId,
        pac: selectedAccountId,
      },
      {
        onSuccess: (updatedData) => {
          const updatedRowData = updatedData.data.data[0];
          console.log(updatedRowData);
          setEditedData(updatedRowData);
          setPurrecordData((prevData) =>
            prevData.map((data) => {
              if (data.id === updatedRowData.id) {
                return updatedRowData;
              }
              return data;
            })
          );
        },
      }
    );
    setEditedRowIndex(-1);
  }
  const deletePurchaseDetailMutation = useDeleteIntoPurchaseDetailData();

  function handleDeletePurchaseDeatailData(id) {
    deletePurchaseDetailMutation.mutate(
      { id: id },
      {
        onSuccess: () => {
          setPurrecordData((prevData) =>
            prevData.filter((data) => data.id !== id)
          );
        },
      }
    );
  }

  const [manageButton, setManageButton] = useState({
    create: false,
    save: true,
    delete: false,
    update: false,
    cancel: false,
    edit: false,
  });

  useEffect(() => {
    const fetchPurchaseMasterData = async () => {
      try {
        const response = await getAllPurchaseDetailData();
        setPurrecordData(response.data);
      } catch (error) {
        console.error("Failed to fetch purchase data:", error);
      }
    };
    fetchPurchaseMasterData();
  }, []);

  const handleClickRecord = (data) => {
    setEditMode(true);
    setEditedData(data);
  };

  const handleAddRow = () => {
    setPurrecordData((prevData) => [...prevData, newRow]);
    // setNewRow({
    //   itemCode: null,
    //   Qty: null,
    //   Rate: null,
    //   value: null,
    //   SGST: null,
    //   CGST: null,
    //   IGST: null,
    //   yearCode: null,
    // });
  };

  const handleNewRecordChange = (e, field) => {
    const { value } = e.target;
    setNewRecord((prevRecord) => ({
      ...prevRecord,
      [field]: value,
    }));
  };

  const colors = useColors();

  useEffect(() => {
    const fetchPurchaseHeadData = async () => {
      try {
        const purchaseHeadResponse = await getAllPurchaseData();
        setPurHeadData(purchaseHeadResponse.data);

        if (purchaseHeadResponse.data.length > 0) {
          setSelectedPurHeadId(purchaseHeadResponse.data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchPurchaseHeadData();
  }, []);

  const handlePurchaseHeadChange = (event) => {
    const selectedOptionId = event.target.value;
    const selectedOption = purHeadData.find(
      (sales) => sales.id === selectedOptionId
    );

    // console.log(selectedOption);
    if (selectedOption) {
      setSelectedPurHeadId(selectedOption.id);
    }
  };

  useEffect(() => {
    const fetchGstRateMasterData = async () => {
      try {
        const gstRateResponse = await getAllGstRateMasterData();
        setGstRateMasterData(gstRateResponse.data);

        if (gstRateResponse.data.length > 0) {
          setSelectedGstRateMasterId(gstRateResponse.data[0].id);
          setSelectedGstRateMasterName(gstRateResponse.data[0].gstName);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchGstRateMasterData();
  }, []);

  const handleGstRateChange = (event) => {
    const selectedOptionId = event.target.value;
    const selectedOption = gstRateMasterData.find(
      (gst) => gst.id === selectedOptionId
    );

    //console.log(selectedOption);
    if (selectedOption) {
      setSelectedGstRateMasterId(selectedOption.id);
      setSelectedGstRateMasterName(selectedOption.gstName);
    }
  };

  useEffect(() => {
    const fetchItemMasterData = async () => {
      try {
        const itemResponse = await getAllItemMasterData();
        setItemMasterData(itemResponse.data);

        if (itemResponse.data.length > 0) {
          setSelectedItemMasterId(itemResponse.data[0].id);
          setSelectedItemMasterName(itemResponse.data[0].gstName);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchItemMasterData();
  }, []);

  const handleItemChange = (event) => {
    const selectedOptionId = event.target.value;
    const selectedOption = itemMasterData.find(
      (item) => item.id === selectedOptionId
    );

    //console.log(selectedOption);
    if (selectedOption) {
      setSelectedItemMasterId(selectedOption.id);
      setSelectedItemMasterName(selectedOption.itemName);
    }
  };

  useEffect(() => {
    const fetchAccountMasterData = async () => {
      try {
        const accountResponse = await getAllAccountMasterData();
        setAccountMasterData(accountResponse.data);
        setAccountData(accountResponse.data);

        if (accountResponse.data.length > 0) {
          setSelectedAccountMasterId(accountResponse.data[0].id);
          setSelectedAccountMasterName(accountResponse.data[0].gstName);
        }
        if (accountResponse.data.length > 0) {
          setSelectedAccountId(accountResponse.data[0].id);
          setSelectedAccountName(accountResponse.data[0].gstName);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchAccountMasterData();
  }, []);

  const handleAccountChange = (event) => {
    const selectedOptionId = event.target.value;
    const selectedOption = accountMasterData.find(
      (account) => account.id === selectedOptionId
    );

    //console.log(selectedOption);
    if (selectedOption) {
      setSelectedAccountMasterId(selectedOption.id);
      setSelectedAccountMasterName(selectedOption.accountName);
    }
  };

  const handleAccountMasterChange = (e) => {
    const selectedOptionId = e.target.value;
    const selectedOptions = accountData.find(
      (account) => account.id === selectedOptionId
    );

    if (selectedOptions) {
      setSelectedAccountId(selectedOptions.id);
      setSelectedAccountName(selectedOptions.accountName);
    }
  };

  return (
    <>
      <MenuBar />
      <Box
        sx={{
          bgcolor: colors.bgColor,
          width: "100%",
          height: "220%",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pt: 70,
          //mt: 17,
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
            description={"Go Back To Purchase Return Records"}
          >
            <Link to="/purchaseReturnRecords" style={{ color: "white" }}>
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
            Purchase Return Form
          </Typography>
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
                // console.log(companyId);
                //setPurchaseCompanyCode();

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
                handleInsertPurchaseData();
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
                handlePurchaseRecordsData();
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
                handleUpdatePurchaseData();
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
                handleDeletePurchaseData();
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

        {/* grid */}
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
                placeholder="Enter Purchase Id"
                label="Purchase Id"
                disabled
                variant="outlined"
                value={purchaseId || ""}
                fullWidth
                required
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="jvType-label">TranType</InputLabel>
                <Select
                  labelId="jvType-label"
                  id="tranType"
                  label="Tran Type"
                  disabled={isDisabled}
                  variant="outlined"
                  onChange={handleInputData}
                  name="tranType"
                  value={purchaseData.tranType || ""}
                >
                  <MenuItem value="PR">Purchase Return</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter Bill Number"
                label="Bill Number"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="billNo"
                value={purchaseData.billNo || ""}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div style={{ width: "80%" }}>
                  <TextField
                    placeholder="Enter Document Date"
                    label="Document Date"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={() => {
                      onDateChange;
                      handleInputData;
                    }}
                    name="docDate"
                    value={calDate.toLocaleDateString()}
                    fullWidth
                  />
                </div>
                <div
                  style={{
                    width: "20%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CustomIconButton onClick={openCalendar}>
                    <CalendarMonthIcon />
                  </CustomIconButton>
                </div>
                {open && <Calendar onChange={onDateChange} value={calDate} />}
              </div>
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter Cash Credit"
                label="Cash Credit"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="cashCredit"
                value={purchaseData.cashCredit || ""}
                fullWidth
                //required
              />
            </Grid>

            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter Account Code"
                label="Account Code"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="accountCode"
                value={purchaseData.accountCode ?? ""}
                fullWidth
                //InputLabelProps={{ shrink: length > 0 ? true : false }}
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter Broker"
                label="Broker"
                disabled={isDisabled}
                variant="outlined"
                name="broker"
                value={purchaseData.broker ?? ""}
                onChange={handleInputData}
                //InputLabelProps={{ shrink: length > 0 ? true : false }}
                fullWidth
                // required
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter LRNo"
                label="LRNo"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="LRNo"
                value={purchaseData.LRNo ?? ""}
                fullWidth
                //InputLabelProps={{ shrink: length > 0 ? true : false }}
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter Truck Number"
                label="Truck Number"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="truckNo"
                value={purchaseData.truckNo || ""}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter Taxable Amount"
                label="Taxable Amount"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="taxableAmount"
                value={purchaseData.taxableAmount ?? ""}
                fullWidth
                //InputLabelProps={{ shrink: length > 0 ? true : false }}
              />
            </Grid>

            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter Amount"
                label="Amount"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="amount"
                value={purchaseData.amount ?? ""}
                fullWidth
                //InputLabelProps={{ shrink: length > 0 ? true : false }}
              />
            </Grid>

            <Grid xs={12} sm={3} item>
              <FormControl fullWidth variant="outlined">
                <InputLabel
                  required
                  id="accountId-label"
                  shrink={
                    accountMasterData.length > 0 || selectedAccountId
                      ? true
                      : false
                  }
                >
                  AC
                </InputLabel>
                {selectedAccountId && (
                  <Select
                    labelId="accountId-label"
                    id="AC"
                    label="AC"
                    disabled={isDisabled}
                    variant="outlined"
                    //onChange={handleInputData}
                    value={selectedAccountId}
                    // {...console.log(selectedAccountId)}
                    onChange={(e) => {
                      handleAccountMasterChange(e);
                      handleInputData;
                    }}
                  >
                    {accountMasterData.map((account) => (
                      <MenuItem key={account.id} value={account.id}>
                        {account.accountName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </FormControl>
            </Grid>
            <Grid xs={12} sm={3} item>
              <FormControl fullWidth variant="outlined">
                <InputLabel
                  required
                  id="AccountId-label"
                  shrink={
                    accountMasterData.length > 0 || selectedAccountId
                      ? true
                      : false
                  }
                >
                  BC
                </InputLabel>
                {selectedAccountMasterId && (
                  <Select
                    labelId="accountId-label"
                    id="BC"
                    label="BC"
                    disabled={isDisabled}
                    variant="outlined"
                    //onChange={handleInputData}
                    value={selectedAccountMasterId}
                    // {...console.log(selectedAccountMasterId)}
                    onChange={(e) => {
                      handleAccountChange(e);
                      handleInputData;
                    }}
                  >
                    {accountMasterData.map((account) => (
                      <MenuItem key={account.id} value={account.id}>
                        {account.accountName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </FormControl>
            </Grid>

            {/* <Grid xs={12} sm={3} item>
                  <TextField
                    placeholder="Enter Company Code"
                    label="Company Code"
                    disabled
                    variant="outlined"
                    //onChange={setAccountmasterCompanyCode(companyData.id)}
                    //onChange={handleInputData}
                    //name="companyCode"
                    value={purchaseCompanyCode}
                    fullWidth
                    required
                  />
                </Grid> */}
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            pt: 2,
            ml: "3%",
          }}
        >
          <Button
            disabled={manageButton.create}
            onClick={() => {
              setShowNewRow(!showNewRow);
              handleAddRow;
              setManageButton({
                create: true,
                save: false,
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
              setManageButton({
                create: false,
                save: true,
              });
              handleInsertPurchaseDetailData();
            }}
            color="green"
            variant="contained"
          >
            Save
          </Button>
        </Box>

        <TableContainer
          sx={{
            height: 300,
            width: "80%",
            mt: 3,
            overflowY: "scroll",
            position: "static",
            left: 0,
          }}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{
              backgroundColor: "#f5f5f5",
              width: "max-context",
              height: "max-context",
              marginLeft: "2%",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell style={{ fontWeight: "bold" }}>id</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>psId</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>itemCode</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Qty</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Rate</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Value</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>gstId</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>SGST</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>CGST</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>IGST</TableCell>
                {/* <TableCell style={{ fontWeight: "bold" }}>yearCode</TableCell> */}
                <TableCell style={{ fontWeight: "bold" }}>ic</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>purcac</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>pac</TableCell>
              </TableRow>
            </TableHead>

            <tbody>
              {purrecordData.map((data) => (
                <TableRow
                  key={data.id}
                  onClick={() => {
                    handleClickRecord(data);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>
                    {editedRowIndex === data ? (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleUpdatePurchaseDetailData()}
                        >
                          Update
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(data)}
                      >
                        Edit
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        handleDeletePurchaseDeatailData(data.id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>
                    {editMode && editedRowIndex === data ? (
                      <Select
                        style={{ width: "200px", height: "25px" }}
                        value={selectedPurHeadId}
                        name="psId"
                        onChange={handlePurchaseHeadChange}
                      >
                        {purHeadData.map((purchase) => (
                          <MenuItem key={purchase.id} value={purchase.id}>
                            {purchase.id}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      data.psId
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && editedRowIndex === data ? (
                      <input
                        type="text"
                        value={editedData.itemCode ?? ""}
                        name="itemCode"
                        onChange={(e) => {
                          setEditedData({
                            ...editedData,
                            itemCode: e.target.value,
                          });
                        }}
                      />
                    ) : (
                      data.itemCode
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && editedRowIndex === data ? (
                      <input
                        type="text"
                        value={editedData.Qty ?? ""}
                        name="Qty"
                        onChange={(e) => {
                          setEditedData({ ...editedData, Qty: e.target.value });
                        }}
                      />
                    ) : (
                      data.Qty
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && editedRowIndex === data ? (
                      <input
                        type="text"
                        value={editedData.Rate ?? ""}
                        name="Rate"
                        onChange={(e) => {
                          setEditedData({
                            ...editedData,
                            Rate: e.target.value,
                          });
                        }}
                      />
                    ) : (
                      data.Rate
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && editedRowIndex === data ? (
                      <input
                        type="text"
                        value={editedData.value ?? ""}
                        name="value"
                        onChange={(e) => {
                          setEditedData({
                            ...editedData,
                            value: e.target.value,
                          });
                        }}
                      />
                    ) : (
                      data.value
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && editedRowIndex === data ? (
                      <Select
                        style={{ width: "200px", height: "25px" }}
                        value={selectedGstRateMasterId}
                        name="gstId"
                        onChange={handleGstRateChange}
                      >
                        {gstRateMasterData.map((gstRate) => (
                          <MenuItem key={gstRate.id} value={gstRate.id}>
                            {gstRate.gstName}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      data.gstId
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && editedRowIndex === data ? (
                      <input
                        type="text"
                        value={editedData.SGST ?? ""}
                        name="SGST"
                        onChange={(e) => {
                          setEditedData({
                            ...editedData,
                            SGST: e.target.value,
                          });
                        }}
                      />
                    ) : (
                      data.SGST
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && editedRowIndex === data ? (
                      <input
                        type="text"
                        value={editedData.CGST ?? ""}
                        name="CGST"
                        onChange={(e) => {
                          setEditedData({
                            ...editedData,
                            CGST: e.target.value,
                          });
                        }}
                      />
                    ) : (
                      data.CGST
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && editedRowIndex === data ? (
                      <input
                        type="text"
                        value={editedData.IGST ?? ""}
                        name="IGST"
                        onChange={(e) => {
                          setEditedData({
                            ...editedData,
                            IGST: e.target.value,
                          });
                        }}
                      />
                    ) : (
                      data.IGST
                    )}
                  </TableCell>
                  {/* <TableCell>
                      {editMode && editedRowIndex === data ? (
                        <input
                          type="text"
                          value={editedData.yearCode ?? ""}
                          name="yearCode"
                          onChange={(e) => {
                            setEditedData({
                              ...editedData,
                              yearCode: e.target.value,
                            });
                          }}
                        />
                      ) : (
                        data.yearCode
                      )}
                    </TableCell> */}
                  <TableCell>
                    {editMode && editedRowIndex === data ? (
                      <Select
                        style={{ width: "200px", height: "25px" }}
                        value={selectedItemMasterId}
                        name="ic"
                        onChange={handleItemChange}
                      >
                        {itemMasterData.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.itemName}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      data.ic
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && editedRowIndex === data ? (
                      <Select
                        style={{ width: "200px", height: "25px" }}
                        value={selectedAccountMasterId}
                        name="purcac"
                        onChange={handleAccountChange}
                      >
                        {accountMasterData.map((account) => (
                          <MenuItem key={account.id} value={account.id}>
                            {account.accountName}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      data.purcac
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && editedRowIndex === data ? (
                      <Select
                        style={{ width: "200px", height: "25px" }}
                        value={selectedAccountId}
                        name="pac"
                        onChange={handleAccountMasterChange}
                      >
                        {accountData.map((account) => (
                          <MenuItem key={account.id} value={account.id}>
                            {account.accountName}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      data.pac
                    )}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow sx={{ display: showNewRow ? "table-row" : "none" }}>
                <TableCell>
                  <Button variant="contained" color="primary" size="small">
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary">
                    Delete
                  </Button>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Select
                    style={{ width: "200px", height: "25px" }}
                    value={selectedPurHeadId}
                    name="sbId"
                    onChange={handlePurchaseHeadChange}
                  >
                    {purHeadData.map((purchase) => (
                      <MenuItem key={purchase.id} value={purchase.id}>
                        {purchase.id}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={newRecord.itemCode ?? ""}
                    name="itemCode"
                    onChange={(e) => handleNewRecordChange(e, "itemCode")}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={newRecord.Qty ?? ""}
                    name="Qty"
                    onChange={(e) => handleNewRecordChange(e, "Qty")}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={newRecord.Rate ?? ""}
                    name="Rate"
                    onChange={(e) => handleNewRecordChange(e, "Rate")}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={newRecord.value ?? ""}
                    name="value"
                    onChange={(e) => handleNewRecordChange(e, "value")}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    style={{ width: "200px", height: "25px" }}
                    value={selectedGstRateMasterId}
                    name="gstId"
                    onChange={(e) => {
                      handleGstRateChange(e);
                      handleNewRecordChange(e, "gstId");
                    }}
                  >
                    {gstRateMasterData.map((gstRate) => (
                      <MenuItem key={gstRate.id} value={gstRate.id}>
                        {gstRate.gstName}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={newRecord.SGST ?? ""}
                    name="SGST"
                    onChange={(e) => handleNewRecordChange(e, "SGST")}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={newRecord.CGST ?? ""}
                    name="CGST"
                    onChange={(e) => handleNewRecordChange(e, "CGST")}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={newRecord.IGST ?? ""}
                    name="IGST"
                    onChange={(e) => handleNewRecordChange(e, "IGST")}
                  />
                </TableCell>
                {/* <TableCell>
                    <input
                      type="text"
                      value={newRecord.yearCode ?? ""}
                      name="yearCode"
                      onChange={(e) => handleNewRecordChange(e, "yearCode")}
                    />
                  </TableCell> */}
                <TableCell>
                  <Select
                    style={{ width: "200px", height: "25px" }}
                    value={selectedItemMasterId}
                    name="ic"
                    onChange={(e) => {
                      handleItemChange(e);
                      handleNewRecordChange(e, "ic");
                    }}
                  >
                    {itemMasterData.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.itemName}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    style={{ width: "200px", height: "25px" }}
                    value={selectedAccountMasterId}
                    name="purcac"
                    onChange={(e) => {
                      handleAccountChange(e);
                      handleNewRecordChange(e, "purcac");
                    }}
                  >
                    {accountMasterData.map((account) => (
                      <MenuItem key={account.id} value={account.id}>
                        {account.accountName}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    style={{ width: "200px", height: "25px" }}
                    value={selectedAccountId}
                    name="pac"
                    onChange={(e) => {
                      handleAccountMasterChange(e);
                      handleNewRecordChange(e, "pac");
                    }}
                  >
                    {accountData.map((account) => (
                      <MenuItem key={account.id} value={account.id}>
                        {account.accountName}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
            </tbody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            m: 2,
            p: 2,
            display: "flex",
            flexDirection: "column",
            bgcolor: colors.card,
            borderRadius: 2,
          }}
        >
          <Grid container spacing={3}>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter CGST Amount"
                label="CGST Amount"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="CGSTAmount"
                value={purchaseData.CGSTAmount ?? ""}
                fullWidth
                // InputLabelProps={{ shrink: length > 0 ? true : false }}
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter SGST Amount"
                label="SGST Amount"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="SGSTAmount"
                value={purchaseData.SGSTAmount ?? ""}
                fullWidth
                //InputLabelProps={{ shrink: length > 0 ? true : false }}
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter IGST Amount"
                label="IGST Amount"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="IGSTAmount"
                value={purchaseData.IGSTAmount ?? ""}
                fullWidth
                // InputLabelProps={{ shrink: length > 0 ? true : false }}
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter Postage"
                label="Postage"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="postage"
                value={purchaseData.postage ?? ""}
                fullWidth
                //InputLabelProps={{ shrink: length > 0 ? true : false }}
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter TCSPar"
                label="TCSPar"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="TCSPar"
                value={purchaseData.TCSPar ?? ""}
                fullWidth
                // InputLabelProps={{ shrink: length > 0 ? true : false }}
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter TCS Amount"
                label="TCS Amount"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="TCSAmount"
                value={purchaseData.TCSAmount ?? ""}
                fullWidth
                //InputLabelProps={{ shrink: length > 0 ? true : false }}
              />
            </Grid>
            {/* <Grid xs={12} sm={3} item>
                <TextField
                  placeholder="Enter Year Code"
                  label="Year Code"
                  disabled={isDisabled}
                  variant="outlined"
                  onChange={handleInputData}
                  name="yearCode"
                  value={purchaseData.yearCode ?? ""}
                  fullWidth
                  // InputLabelProps={{ shrink: length > 0 ? true : false }}
                />
              </Grid> */}
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter TDS Rate"
                label="TDS Rate"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="TDSRate"
                value={purchaseData.TDSRate ?? ""}
                fullWidth
                // InputLabelProps={{ shrink: length > 0 ? true : false }}
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter TDS Amount"
                label="TDS Amount"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="TDSAmount"
                value={purchaseData.TDSAmount ?? ""}
                fullWidth
                //InputLabelProps={{ shrink: length > 0 ? true : false }}
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter FrieghtPerQntl"
                label="FrieghtPerQntl"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="frieghtPerQntl"
                value={purchaseData.frieghtPerQntl ?? ""}
                fullWidth
                // InputLabelProps={{ shrink: length > 0 ? true : false }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default PurchaseReturnForm;
