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
import {Link} from "react-router-dom"
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useColors } from "../../hooks/use-colors";
import CustomIconButton from "../../components/Buttons/CustomIconButton";
import MenuBar from "../menu/menuBar";
import { useIds } from "../IdsContext/IdsContext";
import {
  useDeleteIntoServiceBillData,
  useInsertIntoServiceBillData,
  useUpdateIntoServiceBillData,
} from "../../hooks/serviceBill/serviceBill.mutation";
import { getAllServiceBillDetailData } from "../../api/serviceBill/serviceBillDetail.request";
import { getAllGstRateMasterData } from "../../api/gstRateMaster/gstRateMaster.request";
import { getAllAccountMasterData } from "../../api/accountMaster/accountMaster.request";
import { getAllItemMasterData } from "../../api/itemMaster/itemMaster.request";
import { getAllServiceBillData } from "../../api/serviceBill/serviceBill.request";
import {
  useDeleteIntoServiceBillDetailData,
  useInsertIntoServiceBillDetailData,
  useUpdateIntoServiceBillDetailData,
} from "../../hooks/serviceBill/serviceBillDetail.mutation";

const ServiceBillForm = ({ data }) => {
  const { ids, setIds } = useIds();

  const [serviceBillData, setServiceBillData] = useState({
    docNo: null,
    date: null,
    cc: null,
    gstRateCode: null,
    billNo: "",
    subTotal: null,
    CGSTRate: null,
    CGSTAmount: null,
    SGSTRate: null,
    SGSTAmount: null,
    IGSTAmount: null,
    IGSTRate: null,
    total: null,
    TDSPer: null,
    TDSAmount: null,
    TCSRate: null,
    TCSAmount: null,
    roundOff: null,
    finalAmount: null,
    isTDS: "",
    TDS: null,
    TCSNetPayable: null,
    einvoiceNo: "",
    ackNo: "",
    QRCode: "",
    isDeleted: null,
    companyCode: null,
    yearCode: null,
    createdBy: null,
    modifiedBy: null,
  });
  const [serviceBillId, setServiceBillId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [redirectToServiceBillRecords, setRedirectToServiceBillRecords] =
    useState(false);

  const [purrecordData, setPurrecordData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [editedRowIndex, setEditedRowIndex] = useState(-1);
  const [newRecord, setNewRecord] = useState({});
  const [newRow, setNewRow] = useState({
    rbId: null,
    docNo: null,
    detailId: null,
    description: "",
    amount: null,
    ic: null,
  });
  const [showNewRow, setShowNewRow] = useState(false);

  const [gstRateMasterData, setGstRateMasterData] = useState([]);
  const [selectedGstRateMasterId, setSelectedGstRateMasterId] = useState("");
  const [selectedGstRateMasterName, setSelectedGstRateMasterName] =
    useState("");

  const [itemMasterData, setItemMasterData] = useState([]);
  const [selectedItemMasterId, setSelectedItemMasterId] = useState("");
  const [selectedItemMasterName, setSelectedItemMasterName] = useState("");

  const [serviceBillHeadData, setServiceBillHeadData] = useState([]);
  const [selectedServiceBillHeadId, setSelectedServiceBillHeadId] =
    useState("");
  const [serviceBillHeadDocNo, setServiceBillHeadDocNo] = useState("");

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
    setServiceBillData({
      ...serviceBillData,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceBillRecordsData = () => {
    setServiceBillData(data);
    setServiceBillId(data.id);
  };

  const handleClick = () => {
    setRedirectToServiceBillRecords(true);
  };

  const handleClear = () => {
    setIsDisabled(!isDisabled);
    setServiceBillId(null);
    setServiceBillData({
      docNo: null,
      date: null,
      cc: null,
      gstRateCode: null,
      billNo: "",
      subTotal: null,
      CGSTRate: null,
      CGSTAmount: null,
      SGSTRate: null,
      SGSTAmount: null,
      IGSTAmount: null,
      IGSTRate: null,
      total: null,
      TDSPer: null,
      TDSAmount: null,
      TCSRate: null,
      TCSAmount: null,
      roundOff: null,
      finalAmount: null,
      isTDS: "",
      TDS: null,
      TCSNetPayable: null,
      einvoiceNo: "",
      ackNo: "",
      QRCode: "",
      isDeleted: null,
      companyCode: null,
      yearCode: null,
      createdBy: null,
      modifiedBy: null,
    });
  };

  const [maxDocNo, setMaxDocNo] = useState();

  const fetchServiceBillData = async () => {
    try {
      const response = await getAllServiceBillData();
      console.log(response.data);
      const serviceData = response.data;
      const docNos = serviceData
        .map((item) => item.docNo)
        .filter((docNo) => docNo !== null);

      console.log(docNos);

      const maxDoc = Math.max(...docNos) + 1;
      console.log(maxDoc);
      setMaxDocNo(maxDoc);
    } catch (error) {
      console.error("Failed to fetch Service Bill data:", error);
    }
  };

  useEffect(() => {
    fetchServiceBillData();
  }, []);

  const insertServiceBillMutation = useInsertIntoServiceBillData();

  function handleInsertServiceBillData() {
    insertServiceBillMutation.mutate(
      {
        ...serviceBillData,
        companyCode: ids.companyId,
        createdBy: ids.userId,
        docNo: maxDocNo,
        docDate: calDate,
        cc: selectedAccountMasterId,
        gstRateCode: selectedGstRateMasterId,
        yearCode: ids.accountingYearId,
      },
      {
        onSuccess: () => {
          fetchServiceBillData();
        },
      }
    );
    setIsDisabled(!isDisabled);
    setServiceBillId(null);
    setServiceBillData({
      docNo: null,
      date: null,
      cc: null,
      gstRateCode: null,
      billNo: "",
      subTotal: null,
      CGSTRate: null,
      CGSTAmount: null,
      SGSTRate: null,
      SGSTAmount: null,
      IGSTAmount: null,
      IGSTRate: null,
      total: null,
      TDSPer: null,
      TDSAmount: null,
      TCSRate: null,
      TCSAmount: null,
      roundOff: null,
      finalAmount: null,
      isTDS: "",
      TDS: null,
      TCSNetPayable: null,
      einvoiceNo: "",
      ackNo: "",
      QRCode: "",
      isDeleted: null,
      companyCode: null,
      yearCode: null,
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
  const updateServiceBillMutation = useUpdateIntoServiceBillData();

  function handleUpdateServiceBillData() {
    updateServiceBillMutation.mutate({
      ...serviceBillData,
      companyCode: ids.companyId,
      createdBy: ids.userId,
      cc: selectedAccountMasterId,
      gstRateCode: selectedGstRateMasterId,
      yearCode: ids.accountingYearId,
    });
    setIsDisabled(!isDisabled);
    setServiceBillId(null);
    setServiceBillData({
      docNo: null,
      date: null,
      cc: null,
      gstRateCode: null,
      billNo: "",
      subTotal: null,
      CGSTRate: null,
      CGSTAmount: null,
      SGSTRate: null,
      SGSTAmount: null,
      IGSTAmount: null,
      IGSTRate: null,
      total: null,
      TDSPer: null,
      TDSAmount: null,
      TCSRate: null,
      TCSAmount: null,
      roundOff: null,
      finalAmount: null,
      isTDS: "",
      TDS: null,
      TCSNetPayable: null,
      einvoiceNo: "",
      ackNo: "",
      QRCode: "",
      isDeleted: null,
      companyCode: null,
      yearCode: null,
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
  const deleteServiceBillMutation = useDeleteIntoServiceBillData();

  function handleDeleteServiceBillData() {
    deleteServiceBillMutation.mutate({ id: ServiceBillId });
    setIsDisabled(!isDisabled);
    setServiceBillId(null);
    setServiceBillData({
      docNo: null,
      date: null,
      cc: null,
      gstRateCode: null,
      billNo: "",
      subTotal: null,
      CGSTRate: null,
      CGSTAmount: null,
      SGSTRate: null,
      SGSTAmount: null,
      IGSTAmount: null,
      IGSTRate: null,
      total: null,
      TDSPer: null,
      TDSAmount: null,
      TCSRate: null,
      TCSAmount: null,
      roundOff: null,
      finalAmount: null,
      isTDS: "",
      TDS: null,
      TCSNetPayable: null,
      einvoiceNo: "",
      ackNo: "",
      QRCode: "",
      isDeleted: null,
      companyCode: null,
      yearCode: null,
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

  const insertServiceBillDetailMutation = useInsertIntoServiceBillDetailData();

  function handleInsertServiceBillDetailData() {
    insertServiceBillDetailMutation.mutate(
      {
        ...newRecord,
        rbId: selectedServiceBillHeadId,
        companyCode: ids.companyId,
        createdBy: ids.userId,
        ic: selectedItemMasterId,
        yearCode: ids.accountingYearId,
        docNo:serviceBillHeadDocNo
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
  const updateServiceBillDetailMutation = useUpdateIntoServiceBillDetailData();

  function handleUpdateServiceBillDetailData() {
    updateServiceBillDetailMutation.mutate(
      {
        ...editedData,
        rbId: selectedServiceBillHeadId,
        companyCode: ids.companyId,
        createdBy: ids.userId,
        ic: selectedItemMasterId,
        yearCode: ids.accountingYearId,
        docNo:serviceBillHeadDocNo
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
  const deleteServiceBillDetailMutation = useDeleteIntoServiceBillDetailData();

  function handleDeleteServiceBillDeatailData(id) {
    deleteServiceBillDetailMutation.mutate(
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
    const fetchServiceBillMasterData = async () => {
      try {
        const response = await getAllServiceBillDetailData();
        setPurrecordData(response.data);
      } catch (error) {
        console.error("Failed to fetch ServiceBill data:", error);
      }
    };
    fetchServiceBillMasterData();
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
    const fetchServiceBillHeadData = async () => {
      try {
        const ServiceBillHeadResponse = await getAllServiceBillData();
        setServiceBillHeadData(ServiceBillHeadResponse.data);

        if (ServiceBillHeadResponse.data.length > 0) {
          setSelectedServiceBillHeadId(ServiceBillHeadResponse.data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchServiceBillHeadData();
  }, []);

  const handleServiceHeadChange = (event) => {
    const selectedOptionId = event.target.value;
    const selectedOption = serviceBillHeadData.find(
      (ServiceBill) => ServiceBill.id === selectedOptionId
    );

    // console.log(selectedOption);
    if (selectedOption) {
      setSelectedServiceBillHeadId(selectedOption.id);
      setServiceBillHeadDocNo(selectedOption.docNo);
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
          //height: "100%",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 82,
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
            description={"Go Back To ServiceBill Records"}
          >
              <Link to="/serviceBillRecords" style={{color:"white"}}>

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
            Service Bill Form
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
                handleInsertServiceBillData();
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
                handleServiceBillRecordsData();
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
                handleUpdateServiceBillData();
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
                handleDeleteServiceBillData();
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
            <Grid xs={12} sm={4} item>
              <TextField
                placeholder="Enter ServiceBill Id"
                label="ServiceBill Id"
                disabled
                variant="outlined"
                value={serviceBillId || ""}
                fullWidth
                required
              />
            </Grid>

            <Grid xs={12} sm={4} item>
              <TextField
                placeholder="Enter Bill To"
                label="Bill To"
                disabled={isDisabled}
                variant="outlined"
                name="billTo"
                value={serviceBillData.billTo ?? ""}
                onChange={handleInputData}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={4} item>
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
            <Grid xs={12} sm={4} item>
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
                  CC
                </InputLabel>
                {selectedAccountId && (
                  <Select
                    labelId="accountId-label"
                    id="CC"
                    label="CC"
                    disabled={isDisabled}
                    variant="outlined"
                    value={selectedAccountId}
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
            <Grid xs={12} sm={4} item>
              <FormControl fullWidth variant="outlined">
                <InputLabel
                  required
                  id="gstRateId-label"
                  shrink={
                    gstRateMasterData.length > 0 || selectedGstRateMasterId
                      ? true
                      : false
                  }
                >
                  Gst Rate Code
                </InputLabel>
                {selectedGstRateMasterId && (
                  <Select
                    labelId="gstRateId-label"
                    id="gstRateCode"
                    label="GST Rate Code"
                    disabled={isDisabled}
                    variant="outlined"
                    value={selectedGstRateMasterId}
                    name="gstRateCode"
                    onChange={(e) => {
                      handleGstRateChange(e);
                      handleInputData;
                    }}
                  >
                    {gstRateMasterData.map((gstRate) => (
                      <MenuItem key={gstRate.id} value={gstRate.id}>
                        {gstRate.gstName}
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
              handleInsertServiceBillDetailData();
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
            width: "70%",
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
                <TableCell style={{ fontWeight: "bold" }}>rbId</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>docNo</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>detailId</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  description
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>amount</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>ic</TableCell>
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
                          onClick={() => handleUpdateServiceBillDetailData()}
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
                        handleDeleteServiceBillDeatailData(data.id);
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
                        value={selectedServiceBillHeadId}
                        name="rbId"
                        onChange={handleServiceHeadChange}
                      >
                        {serviceBillHeadData.map((service) => (
                          <MenuItem key={service.id} value={service.id}>
                            {service.id}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      data.rbId
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && editedRowIndex === data ? (
                      <input
                        type="text"
                        value={data.docNo}
                        name="docNo"
                        disabled
                      />
                    ) : selectedServiceBillHeadId === data.tranId ? (
                      serviceBillHeadDocNo
                    ) : (
                      data.docNo
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && editedRowIndex === data ? (
                      // <Select
                      //   style={{ width: "200px", height: "25px" }}
                      //   //value={selectedServiceBillHeadId}
                      //   name="detailId"
                      //   //onChange={handleServiceHeadChange}
                      // >
                      //   <MenuItem key={id} value={id}>
                      //     {id}
                      //   </MenuItem>
                      // </Select>
                      <input 
                      type="text"
                      value={editedData.detailId ?? ""}
                      name="detailId"
                      onChange={(e) => {
                        setEditedData({
                          ...editedData,
                          detailId: e.target.value,
                        });
                      }}/>
                    ) : (
                      data.detailId
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && editedRowIndex === data ? (
                      <input
                        type="text"
                        value={editedData.description ?? ""}
                        name="description"
                        onChange={(e) => {
                          setEditedData({
                            ...editedData,
                            description: e.target.value,
                          });
                        }}
                      />
                    ) : (
                      data.description
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && editedRowIndex === data ? (
                      <input
                        type="text"
                        value={editedData.amount ?? ""}
                        name="amount"
                        onChange={(e) => {
                          setEditedData({
                            ...editedData,
                            amount: e.target.value,
                          });
                        }}
                      />
                    ) : (
                      data.amount
                    )}
                  </TableCell>
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
                    value={selectedServiceBillHeadId}
                    name="rbId"
                    onChange={handleServiceHeadChange}
                  >
                    {serviceBillHeadData.map((service) => (
                      <MenuItem key={service.id} value={service.id}>
                        {service.id}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  {/* <input
                    type="text"
                    value={newRecord.docNo ?? ""}
                    name="docNo"
                    onChange={(e) => handleNewRecordChange(e, "docNo")}
                  /> */}
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={newRecord.detailId ?? ""}
                    name="detailId"
                    onChange={(e) => handleNewRecordChange(e, "detailId")}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={newRecord.description ?? ""}
                    name="description"
                    onChange={(e) => handleNewRecordChange(e, "description")}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={newRecord.amount ?? ""}
                    name="amount"
                    onChange={(e) => handleNewRecordChange(e, "amount")}
                  />
                </TableCell>

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
                placeholder="Enter SubTotal"
                label="SubTotal"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="subTotal"
                value={serviceBillData.subTotal ?? ""}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter CGST Rate"
                label="CGST Rate"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="CGSTRate"
                value={serviceBillData.CGSTRate ?? ""}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter CGST Amount"
                label="CGST Amount"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="CGSTAmount"
                value={serviceBillData.CGSTAmount ?? ""}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter SGST Rate"
                label="SGST Rate"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="SGSTRate"
                value={serviceBillData.SGSTRate ?? ""}
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
                value={serviceBillData.SGSTAmount ?? ""}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter IGST Rate"
                label="IGST Rate"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="IGSTRate"
                value={serviceBillData.IGSTRate ?? ""}
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
                value={serviceBillData.IGSTAmount ?? ""}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter Total"
                label="Total"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="total"
                value={serviceBillData.total ?? ""}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter Round Off"
                label="Round Off"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="roundOff"
                value={serviceBillData.roundOff ?? ""}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter Final Amount"
                label="Final Amount"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="finalAmount"
                value={serviceBillData.finalAmount ?? ""}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter TCSPer"
                label="TCSPer"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="TCSPer"
                value={serviceBillData.TCSPer ?? ""}
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
                value={serviceBillData.TCSAmount ?? ""}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter TCS NetPayable"
                label="TCS NetPayable"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="TCSNetPayable"
                value={serviceBillData.TCSNetPayable ?? ""}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter IsTDS"
                label="IsTDS"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="isTDS"
                value={serviceBillData.isTDS ?? ""}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter TDS"
                label="TDS"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="TDS"
                value={serviceBillData.TDS ?? ""}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter TDS Rate"
                label="TDS Rate"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="TDSRate"
                value={serviceBillData.TDSRate ?? ""}
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
                value={serviceBillData.TDSAmount ?? ""}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter eInvoiceNo"
                label="eInvoiceNo"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="einvoiceNo"
                value={serviceBillData.einvoiceNo ?? ""}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter ackNo"
                label="ackNo"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="ackNo"
                value={serviceBillData.ackNo ?? ""}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter QR Code"
                label="QR Code"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="QRCode"
                value={serviceBillData.QRCode ?? ""}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} item>
              <TextField
                placeholder="Enter isDeleted"
                label="isDeleted"
                disabled={isDisabled}
                variant="outlined"
                onChange={handleInputData}
                name="isDeleted"
                value={serviceBillData.isDeleted ?? ""}
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ServiceBillForm;
