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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
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
import{Link} from "react-router-dom"

import { useIds } from "../IdsContext/IdsContext";
import {
  useDeleteIntoSalesData,
  useInsertIntoSalesData,
  useUpdateIntoSalesData,
} from "../../hooks/sales/sales.mutation";
import {
  useDeleteIntoSalesDetailData,
  useInsertIntoSalesDetailData,
  useUpdateIntoSalesDetailData,
} from "../../hooks/sales/salesDetail.mutation";
import { getAllSalesDetailData, getSalesDetailData } from "../../api/sales/salesDetail.request";
import { getAllGstRateMasterData } from "../../api/gstRateMaster/gstRateMaster.request";
import { getAllAccountMasterData } from "../../api/accountMaster/accountMaster.request";
import { getAllItemMasterData } from "../../api/itemMaster/itemMaster.request.js";
import { getAllSalesData } from "../../api/sales/sales.request";

const SalesForm = ({ data }) => {
  const { ids, setIds } = useIds();

  const [salesData, setSalesData] = useState({
    tranType: "",
    cashCredit: "",
    docNo: null,
    docDate: null,
    billTo: null,
    shipTo: null,
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
    companyCode: null,
    yearCode: null,
    modifiedBy: null,
    ac: null,
    bc: null,
    TDSRate: null,
    TDSAmount: null,
  });
  const [salesId, setSalesId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [redirectToSalesRecords, setRedirectToSalesRecords] = useState(false);

  const [purrecordData, setPurrecordData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [editedRowIndex, setEditedRowIndex] = useState(-1);
  const [newRecord, setNewRecord] = useState({});
  const [newRow, setNewRow] = useState({
    sbId: null,
    itemCode: null,
    quantity: null,
    rate: null,
    value: null,
    gstId: null,
    SGSTAmount: null,
    CGSTAmount: null,
    IGSTAmount: null,
    //yearCode: null,
    ic: null,
    saleAc: null,
    sac: null,
  });
  const [showNewRow, setShowNewRow] = useState(false);

  const [gstRateMasterData, setGstRateMasterData] = useState([]);
  const [selectedGstRateMasterId, setSelectedGstRateMasterId] = useState("");
  const [selectedGstRateMasterName, setSelectedGstRateMasterName] =
    useState("");

  const [itemMasterData, setItemMasterData] = useState([]);
  const [selectedItemMasterId, setSelectedItemMasterId] = useState("");
  const [selectedItemMasterName, setSelectedItemMasterName] = useState("");

  const [salesHeadData, setSalesHeadData] = useState([]);
  const [selectedSalesHeadId, setSelectedSalesHeadId] = useState("");

  const [accountMasterData, setAccountMasterData] = useState([]);
  const [accountData, setAccountData] = useState([]);
  const [selectedAccountMasterId, setSelectedAccountMasterId] = useState("");
  const [selectedAccountMasterName, setSelectedAccountMasterName] =
    useState("");
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [selectedAccountName, setSelectedAccountName] = useState("");

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
  };

  const handleInputData = (e) => {
    setSalesData({
      ...salesData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSalesRecordsData = () => {
    setSalesData(data);
    setSalesId(data.id);
  };

  const handleClick = () => {
    setRedirectToSalesRecords(true);
  };

  const handleClear = () => {
    setIsDisabled(!isDisabled);
    setSalesId(null);
    setSalesData({
      tranType: "",
      cashCredit: "",
      docNo: null,
      docDate: null,
      billTo: null,
      shipTo: null,
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
      companyCode: null,
      yearCode: null,
      modifiedBy: null,
      ac: null,
      bc: null,
      TDSRate: null,
      TDSAmount: null,
    });
  };

  const [maxDocNo, setMaxDocNo] = useState();

  const fetchSalesData = async () => {
    try {
      const response = await getAllSalesData();
      const salesData = response.data;
      const docNos = salesData
        .map((item) => item.docNo)
        .filter((docNo) => docNo !== null);

      const maxDoc = Math.max(...docNos) + 1;
      setMaxDocNo(maxDoc);
    } catch (error) {
      console.error("Failed to fetch Sales data:", error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  const insertSalesMutation = useInsertIntoSalesData();

  function handleInsertSalesData() {
    insertSalesMutation.mutate(
      {
        ...salesData,
        companyCode: ids.companyId,
        createdBy: ids.userId,
        ac: selectedAccountMasterId,
        bc: selectedAccountId,
        yearCode: ids.accountingYearId,
        docNo: maxDocNo,
        docDate: calDate,
      },
      {
        onSuccess: () => {
          fetchSalesData();
        },
      }
    );
    setIsDisabled(!isDisabled);
    setSalesId(null);
    setSalesData({
      tranType: "",
      cashCredit: "",
      docNo: null,
      docDate: null,
      billTo: null,
      shipTo: null,
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
      companyCode: null,
      yearCode: null,
      modifiedBy: null,
      ac: null,
      bc: null,
      TDSRate: null,
      TDSAmount: null,
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
  const updateSalesMutation = useUpdateIntoSalesData();

  function handleUpdateSalesData() {
    updateSalesMutation.mutate({
      ...salesData,
      companyCode: ids.companyId,
      createdBy: ids.userId,
      ac: selectedAccountMasterId,
      bc: selectedAccountId,
      yearCode: ids.accountingYearId,
    });
    setIsDisabled(!isDisabled);
    setSalesId(null);
    setSalesData({
      tranType: "",
      cashCredit: "",
      docNo: null,
      docDate: null,
      billTo: null,
      shipTo: null,
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
      companyCode: null,
      yearCode: null,
      modifiedBy: null,
      ac: null,
      bc: null,
      TDSRate: null,
      TDSAmount: null,
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
  const deleteSalesMutation = useDeleteIntoSalesData();

  async function checkIfUseInSalesDetail(salesId) {
    try {
      const salesDetailData = await getSalesDetailData(salesId);
      console.log("salesDetailData", salesDetailData);
      return salesDetailData.length > 0;
    } catch (error) {
      console.error("Failed to fetch Sales Detail data:", error);
      return false;
    }
  }

  function handleDeleteSalesData() {
    try{
      const isInSalesDetail = checkIfUseInSalesDetail(salesId);
      if (isInSalesDetail) {
        alert(
          "Cannot delete the Sales. It is associated with SalesDetail."
        );
        return;
      }

      deleteSalesMutation.mutate({ id: salesId });
      setIsDisabled(!isDisabled);
      setSalesId(null);
      setSalesData({
        tranType: "",
        cashCredit: "",
        docNo: null,
        docDate: null,
        billTo: null,
        shipTo: null,
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
        companyCode: null,
        yearCode: null,
        modifiedBy: null,
        ac: null,
        bc: null,
        TDSRate: null,
        TDSAmount: null,
      });
      setManageButton({
        create: false,
        save: true,
        delete: false,
        update: false,
        cancel: false,
        edit: false,
      });
    }catch(error){
      console.error("Failed to delete Sales :",error)
    }
  }

  const insertSalesDetailMutation = useInsertIntoSalesDetailData();

  function handleInsertSalesDetailData() {
    insertSalesDetailMutation.mutate(
      {
        ...newRecord,
        sbId: selectedSalesHeadId,
        gstId: selectedGstRateMasterId,
        companyCode: ids.companyId,
        createdBy: ids.userId,
        ic: selectedItemMasterId,
        saleAc: selectedAccountMasterId,
        sac: selectedAccountId,
        yearCode: ids.accountingYearId,
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
  const updateSalesDetailMutation = useUpdateIntoSalesDetailData();

  function handleUpdateSalesDetailData() {
    updateSalesDetailMutation.mutate(
      {
        ...editedData,
        sbId: selectedSalesHeadId,
        gstId: selectedGstRateMasterId,
        companyCode: ids.companyId,
        createdBy: ids.userId,
        ic: selectedItemMasterId,
        saleAc: selectedAccountMasterId,
        sac: selectedAccountId,
        yearCode: ids.accountingYearId,
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
  const deleteSalesDetailMutation = useDeleteIntoSalesDetailData();

  function handleDeleteSalesDeatailData(id) {
    deleteSalesDetailMutation.mutate(
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
    const fetchSalesMasterData = async () => {
      try {
        const response = await getAllSalesDetailData();
        setPurrecordData(response.data);
      } catch (error) {
        console.error("Failed to fetch sales data:", error);
      }
    };
    fetchSalesMasterData();
  }, []);

  const handleClickRecord = (data) => {
    setEditMode(true);
    setEditedData(data);
  };

  const handleAddRow = () => {
    setPurrecordData((prevData) => [...prevData, newRow]);
    // setNewRow({
    //   sbId: null,
    //   itemCode: null,
    //   quantity: null,
    //   rate: null,
    //   value: null,
    //   gstId: null,
    //   SGSTAmount: null,
    //   CGSTAmount: null,
    //   IGSTAmount: null,
    //   yearCode: null,
    //   ic: null,
    //   saleAc: null,
    //   sac: null,
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
    const fetchSalesHeadData = async () => {
      try {
        const salesHeadResponse = await getAllSalesData();
        setSalesHeadData(salesHeadResponse.data);

        if (salesHeadResponse.data.length > 0) {
          setSelectedSalesHeadId(salesHeadResponse.data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchSalesHeadData();
  }, []);

  const handleSaleHeadChange = (event) => {
    const selectedOptionId = event.target.value;
    const selectedOption = salesHeadData.find(
      (sales) => sales.id === selectedOptionId
    );

    // console.log(selectedOption);
    if (selectedOption) {
      setSelectedSalesHeadId(selectedOption.id);
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
          height: "205%",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pt: 63,
          // mt: 17,
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
            description={"Go Back To Sales Return Records"}
          >
            <Link to="/salesRecords" style={{ color: "white" }}>
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
            Sales Return Form
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
                handleInsertSalesData();
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
                handleSalesRecordsData();
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
                handleUpdateSalesData();
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
                handleDeleteSalesData();
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
                placeholder="Enter Sales Id"
                label="Sales Id"
                disabled
                variant="outlined"
                value={salesId || ""}
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
                  value={salesData.tranType ?? ""}
                >
                  <MenuItem value="SR">Sales Return</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter Amount"
                label="Amount"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="amount"
                value={salesData.amount ?? ""}
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
                placeholder="Enter Bill To"
                label="Bill To"
                disabled={isDisabled}
                variant="outlined"
                name="billTo"
                value={salesData.billTo ?? ""}
                onChange={handleInputData}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter Ship To"
                label="Ship To"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="shipTo"
                value={salesData.shipTo ?? ""}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter Cash Credit"
                label="Cash Credit"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="cashCredit"
                value={salesData.cashCredit || ""}
                fullWidth
                //required
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter Broker"
                label="Broker"
                disabled={isDisabled}
                variant="outlined"
                name="broker"
                value={salesData.broker ?? ""}
                onChange={handleInputData}
                fullWidth
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
                value={salesData.LRNo ?? ""}
                fullWidth
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
                value={salesData.truckNo || ""}
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
                value={salesData.taxableAmount ?? ""}
                fullWidth
              />
            </Grid>

            {/* <Grid xs={12} sm={3} item>
                    <TextField
                    placeholder="Enter Company Code"
                    label="Company Code"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="companyCode"
                    value={salesData.companyCode ?? ""}
                    fullWidth
                    />
                </Grid> */}

            {/* <Grid xs={12} sm={3} item>
                <TextField
                  placeholder="Enter Modified By"
                  label="Modified By"
                  disabled={isDisabled}
                  variant="outlined"
                  onChange={handleInputData}
                  name="modifiedBy"
                  value={salesData.modifiedBy ?? ""}
                  fullWidth
                />
              </Grid> */}
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
              setShowNewRow(!showNewRow);
              setManageButton({
                create: false,
                save: true,
              });
              handleInsertSalesDetailData();
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
                <TableCell style={{ fontWeight: "bold" }}>sbId</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>itemCode</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>quantity</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>rate</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>value</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>gstId</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>SGSTAmount</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>CGSTAmount</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>IGSTAmount</TableCell>
                {/* <TableCell style={{ fontWeight: "bold" }}>yearCode</TableCell> */}
                <TableCell style={{ fontWeight: "bold" }}>ic</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>saleAc</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>sac</TableCell>
              </TableRow>
            </TableHead>

            <tbody>
              {purrecordData.map((data, index) => (
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
                          onClick={() => handleUpdateSalesDetailData()}
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
                        handleDeleteSalesDeatailData(data.id);
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
                        value={selectedSalesHeadId}
                        name="sbId"
                        onChange={handleSaleHeadChange}
                      >
                        {salesHeadData.map((sale) => (
                          <MenuItem key={sale.id} value={sale.id}>
                            {sale.id}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      data.sbId
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
                        value={editedData.quantity ?? ""}
                        name="quantity"
                        onChange={(e) => {
                          setEditedData({
                            ...editedData,
                            quantity: e.target.value,
                          });
                        }}
                      />
                    ) : (
                      data.quantity
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && editedRowIndex === data ? (
                      <input
                        type="text"
                        value={editedData.rate ?? ""}
                        name="rate"
                        onChange={(e) => {
                          setEditedData({
                            ...editedData,
                            rate: e.target.value,
                          });
                        }}
                      />
                    ) : (
                      data.rate
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
                        value={editedData.SGSTAmount ?? ""}
                        name="SGSTAmount"
                        onChange={(e) => {
                          setEditedData({
                            ...editedData,
                            SGSTAmount: e.target.value,
                          });
                        }}
                      />
                    ) : (
                      data.SGSTAmount
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && editedRowIndex === data ? (
                      <input
                        type="text"
                        value={editedData.CGSTAmount ?? ""}
                        name="CGSTAmount"
                        onChange={(e) => {
                          setEditedData({
                            ...editedData,
                            CGSTAmount: e.target.value,
                          });
                        }}
                      />
                    ) : (
                      data.CGSTAmount
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && editedRowIndex === data ? (
                      <input
                        type="text"
                        value={editedData.IGSTAmount ?? ""}
                        name="IGSTAmount"
                        onChange={(e) => {
                          setEditedData({
                            ...editedData,
                            IGSTAmount: e.target.value,
                          });
                        }}
                      />
                    ) : (
                      data.IGSTAmount
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
                        name="saleAc"
                        onChange={handleAccountChange}
                      >
                        {accountMasterData.map((account) => (
                          <MenuItem key={account.id} value={account.id}>
                            {account.accountName}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      data.saleAc
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && editedRowIndex === data ? (
                      <Select
                        style={{ width: "200px", height: "25px" }}
                        value={selectedAccountId}
                        name="sac"
                        onChange={handleAccountMasterChange}
                      >
                        {accountData.map((account) => (
                          <MenuItem key={account.id} value={account.id}>
                            {account.accountName}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      data.sac
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
                    value={selectedSalesHeadId}
                    name="sbId"
                    onChange={handleSaleHeadChange}
                  >
                    {salesHeadData.map((sale) => (
                      <MenuItem key={sale.id} value={sale.id}>
                        {sale.id}
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
                    value={newRecord.quantity ?? ""}
                    name="Qty"
                    onChange={(e) => handleNewRecordChange(e, "Qty")}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={newRecord.rate ?? ""}
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
                    name="saleAc"
                    onChange={(e) => {
                      handleAccountChange(e);
                      handleNewRecordChange(e, "saleAc");
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
                    name="sac"
                    onChange={(e) => {
                      handleAccountMasterChange(e);
                      handleNewRecordChange(e, "sac");
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
                value={salesData.CGSTAmount ?? ""}
                fullWidth
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
                value={salesData.SGSTAmount ?? ""}
                fullWidth
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
                value={salesData.IGSTAmount ?? ""}
                fullWidth
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
                value={salesData.postage ?? ""}
                fullWidth
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
                value={salesData.TCSPar ?? ""}
                fullWidth
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
                value={salesData.TCSAmount ?? ""}
                fullWidth
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
                  value={salesData.yearCode ?? ""}
                  fullWidth
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
                value={salesData.TDSRate ?? ""}
                fullWidth
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
                value={salesData.TDSAmount ?? ""}
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default SalesForm;
