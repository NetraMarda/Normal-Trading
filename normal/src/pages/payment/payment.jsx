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
import { useIds } from "../IdsContext/IdsContext";
import { getAllSalesDetailData } from "../../api/sales/salesDetail.request";
import { getAllAccountMasterData } from "../../api/accountMaster/accountMaster.request";
import { getAllPaymentHeadData } from "../../api/payment/paymentHead.request";
import {
  useDeleteIntoPaymentHeadData,
  useInsertIntoPaymentHeadData,
  useUpdateIntoPaymentHeadData,
} from "../../hooks/payment/paymentHead.mutation";
import {
  useDeleteIntoPaymentDetailData,
  useInsertIntoPaymentDetailData,
  useUpdateIntoPaymentDetailData,
} from "../../hooks/payment/paymentDetail.mutation";
import { getAllPaymentDetailData } from "../../api/payment/paymentDetail.request";
import PaymentRecords from "./paymentRecord";
import { Link } from "react-router-dom";

const PaymentForm = ({ data }) => {
  const { ids, setIds } = useIds();

  const [paymentData, setPaymentData] = useState({
    tranType: "",
    docNo: null,
    docDate: null,
    total: 0,
    cb: null,
    companyCode: null,
    yearCode: null,
    createdBy: null,
    modifiedBy: null,
  });
  const [paymentId, setPaymentId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [redirectToPaymentRecords, setRedirectToPaymentRecords] =
    useState(false);

  const [purrecordData, setPurrecordData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [editedRowIndex, setEditedRowIndex] = useState(-1);
  const [newRecord, setNewRecord] = useState({});
  const [newRow, setNewRow] = useState({
    tranId: null,
    tranType: "",
    docNo: null,
    docDate: "",
    detailsId: null,
    amount: null,
    drcr: "",
    narration: "",
    ac: null,
    companyCode: null,
    yearCode: null,
    createBy: null,
    modifiedBy: null,
  });
  const [showNewRow, setShowNewRow] = useState(false);

  const [paymentHeadData, setPaymentHeadData] = useState([]);
  const [selectedPaymentHeadId, setSelectedPaymentHeadId] = useState("");
  const [paymentHeadDocNo, setPaymentHeadDocNo] = useState("");
  const [paymentHeadDocDate, setPaymentHeadDocDate] = useState();

  const [accountData, setAccountData] = useState([]);
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
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentRecordsData = () => {
    setPaymentData(data);
    setPaymentId(data.id);
  };

  const handleClick = () => {
    setRedirectToPaymentRecords(true);
  };

  const handleClear = () => {
    setIsDisabled(!isDisabled);
    setPaymentId(null);
    setPaymentData({
      tranType: "",
      docNo: null,
      docDate: null,
      total: null,
      cb: null,
      companyCode: null,
      yearCode: null,
      createdBy: null,
      modifiedBy: null,
    });
  };

  const [maxDocNo, setMaxDocNo] = useState();

  const fetchPaymentData = async () => {
    try {
      const response = await getAllPaymentHeadData();
      const paymentData = response.data;
      // console.log(paymentData);
      // setPurrecordData(paymentData);
      const docNos = paymentData
        .map((item) => item.docNo)
        .filter((docNo) => docNo !== null);
      //console.log(docNos);

      const maxDoc = Math.max(...docNos) + 1;
      setMaxDocNo(maxDoc);
      //console.log(maxDocNo)
    } catch (error) {
      console.error("Failed to fetch Payment data:", error);
    }
  };
  useEffect(() => {
    fetchPaymentData();
  }, []);

  const insertSalesMutation = useInsertIntoPaymentHeadData();

  function handleInsertPaymentData() {
    insertSalesMutation.mutate(
      {
        ...paymentData,
        companyCode: ids.companyId,
        createdBy: ids.userId,
        docNo: maxDocNo,
        cb: selectedAccountId,
        yearCode: ids.accountingYearId,
        docDate: calDate,
      },
      {
        onSuccess: () => {
          fetchPaymentData();
        },
      }
    );
    setIsDisabled(!isDisabled);
    setPaymentId(null);
    setPaymentData({
      tranType: "",
      docNo: null,
      docDate: null,
      total: 0,
      cb: null,
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
  const updateSalesMutation = useUpdateIntoPaymentHeadData();

  function handleUpdatePaymentData() {
    updateSalesMutation.mutate({
      ...paymentData,
      companyCode: ids.companyId,
      createdBy: ids.userId,
      cb: selectedAccountId,
      //   bc: selectedAccountId,
      yearCode: ids.accountingYearId,
    });
    setIsDisabled(!isDisabled);
    setPaymentId(null);
    setPaymentData({
      tranType: "",
      docNo: null,
      docDate: null,
      total: 0,
      cb: null,
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
  const deleteSalesMutation = useDeleteIntoPaymentHeadData();

  function handleDeletePaymentData() {
    deleteSalesMutation.mutate({ id: paymentId });
    setIsDisabled(!isDisabled);
    setPaymentId(null);
    setPaymentData({
      tranType: "",
      docNo: null,
      docDate: null,
      total: 0,
      cb: null,
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

  const insertSalesDetailMutation = useInsertIntoPaymentDetailData();

  function handleInsertPaymentDetailData() {
    const drcrCode = newRecord.drcr === "0" ? "0" : "1";
    insertSalesDetailMutation.mutate(
      {
        ...newRecord,
        tranId: selectedPaymentHeadId,
        //gstId: selectedGstRateMasterId,
        companyCode: ids.companyId,
        createdBy: ids.userId,
        ac: selectedAccountId,
        yearCode: ids.accountingYearId,
        drcr: drcrCode,
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
  const updateSalesDetailMutation = useUpdateIntoPaymentDetailData();

  function handleUpdatePaymentDetailData() {
    //const drcrCode = editedData.drcr === "0" ? "0" : "1";
    //console.log(drcrCode  , editedData.drcr )
    // console.log(editedData);
    updateSalesDetailMutation.mutate(
      {
        ...editedData,
        tranId: selectedPaymentHeadId,
        companyCode: ids.companyId,
        createdBy: ids.userId,
        ac: selectedAccountId,
        yearCode: ids.accountingYearId,
        docDate: paymentHeadDocDate,
        docNo: paymentHeadDocNo,
        //drcr: drcrCode,
        //tranType: tranTypes,
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
  const deleteSalesDetailMutation = useDeleteIntoPaymentDetailData();

  function handleDeletePaymentDetailData(id) {
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
    const fetchPaymentData = async () => {
      try {
        const response = await getAllPaymentDetailData();
       // console.log(response.data);
        setPurrecordData(response.data);
      } catch (error) {
        console.error("Failed to fetch Payment data:", error);
      }
    };
    fetchPaymentData();
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

  function handleNewRecordChange(e, field) {
    const { value } = e.target;
    let updatedValue = value;

    if (field === "drcr") {
      updatedValue = value === "0" ? "0" : "1";
      console.log("updated", updatedValue);
    }

    setNewRecord((prevRecord) => ({
      ...prevRecord,
      [field]: updatedValue,
    }));
  }

  const colors = useColors();

  useEffect(() => {
    const fetchPaymentHeadData = async () => {
      try {
        const salesHeadResponse = await getAllPaymentHeadData();
        setPaymentHeadData(salesHeadResponse.data);

        if (salesHeadResponse.data.length > 0) {
          setSelectedPaymentHeadId(salesHeadResponse.data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchPaymentHeadData();
  }, []);

  const handlePaymentHeadChange = (event) => {
    const selectedOptionId = event.target.value;
    const selectedOption = paymentHeadData.find(
      (journal) => journal.id === selectedOptionId
    );

    if (selectedOption) {
      setSelectedPaymentHeadId(selectedOption.id);
      setPaymentHeadDocNo(selectedOption.docNo);
      setPaymentHeadDocDate(selectedOption.docDate);
    }
  };

  useEffect(() => {
    const fetchAccountMasterData = async () => {
      try {
        const accountResponse = await getAllAccountMasterData();
        setAccountData(accountResponse.data);

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
      {redirectToPaymentRecords ? (
        <PaymentRecords />
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
              mt: 17,
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
                description={"Go Back To Receipt Records"}
              >
                <Link to="/paymentRecords" style={{ color: "white" }}>
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
                Receipt / Payment Form
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
                    handleInsertPaymentData();
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
                    handlePaymentRecordsData();
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
                    handleUpdatePaymentData();
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
                    handleDeletePaymentData();
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
                    placeholder="Enter Journal Id"
                    label="Journal Id"
                    disabled
                    variant="outlined"
                    value={paymentId || ""}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
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
                      value={paymentData.tranType || ""}
                    >
                      <MenuItem value="CP">Cash Payment</MenuItem>
                      <MenuItem value="CR">Cash Receipt</MenuItem>
                      <MenuItem value="BR">Bank Receipt</MenuItem>
                      <MenuItem value="BP">Bank Payment</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/* <Grid xs={12} sm={3} item>
                <TextField
                  placeholder="Enter Document number"
                  label="Document Number"
                  disabled
                  variant="outlined"
                  //onChange={setMaxDocNo(maxDocNo)}
                  name="docNo"
                  value={maxDocNo}
                  InputLabelProps={{ shrink: length > 0 ? true : false }}
                  fullWidth
                />
              </Grid> */}
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
                    {open && (
                      <Calendar onChange={onDateChange} value={calDate} />
                    )}
                  </div>
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter Total"
                    label="Total"
                    disabled
                    variant="outlined"
                    name="Total"
                    defaultValue={0}
                    InputLabelProps={{ shrink: length > 0 ? true : false }}
                    onChange={handleInputData}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel
                      required
                      id="accountId-label"
                      shrink={
                        accountData.length > 0 || selectedAccountId
                          ? true
                          : false
                      }
                    >
                      CB
                    </InputLabel>
                    {selectedAccountId && (
                      <Select
                        labelId="accountId-label"
                        id="CB"
                        label="CB"
                        disabled={isDisabled}
                        variant="outlined"
                        value={selectedAccountId}
                        onChange={(e) => {
                          handleAccountMasterChange(e);
                          handleInputData;
                        }}
                      >
                        {accountData.map((account) => (
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
                  handleInsertPaymentDetailData();
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
                    <TableCell style={{ fontWeight: "bold" }}>tranId</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      tranType
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>docNo</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      docDate
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      detailsId
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>amount</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>drcr</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      narration
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>ac</TableCell>
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
                              onClick={() => handleUpdatePaymentDetailData()}
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
                            handleDeletePaymentDetailData(data.id);
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
                            value={selectedPaymentHeadId}
                            name="tranId"
                            onChange={(e) => {
                              handlePaymentHeadChange(e);
                              setEditedData({
                                ...editedData,
                                tranId: e.target.value,
                              });
                            }}
                          >
                            {paymentHeadData.map((journal) => (
                              <MenuItem key={journal.id} value={journal.id}>
                                {journal.id}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          data.tranId
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode && editedRowIndex === data ? (
                          <Select
                            style={{ width: "200px", height: "25px" }}
                            value={editedData.tranType ?? ""}
                            name="tranType"
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              setEditedData(() => ({
                                ...editedData,
                                tranType: selectedValue,
                              }));
                            }}
                          >
                            <MenuItem value="CP">Cash Payment</MenuItem>
                            <MenuItem value="CR">Cash Receipt</MenuItem>
                            <MenuItem value="BR">Bank Receipt</MenuItem>
                            <MenuItem value="BP">Bank Payment</MenuItem>
                          </Select>
                        ) : (
                          data.tranType
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
                        ) : selectedPaymentHeadId === data.tranId ? (
                          paymentHeadDocNo
                        ) : (
                          data.docNo
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode && editedRowIndex === data ? (
                          <input
                            type="text"
                            value={data.docDate}
                            name="docDate"
                            disabled
                          />
                        ) : selectedPaymentHeadId === data.tranId ? (
                          paymentHeadDocDate
                        ) : (
                          data.docDate
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode && editedRowIndex === data ? (
                          <input
                            type="text"
                            value={editedData.detailId ?? ""}
                            name="detailId"
                            onChange={(e) => {
                              setEditedData({
                                ...editedData,
                                detailId: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          //   <Select
                          //     style={{ width: "200px", height: "25px" }}
                          //     //value={selectedServiceBillHeadId}
                          //     name="detailId"
                          //     //onChange={handleServiceHeadChange}
                          //   >
                          //     <MenuItem value={""}></MenuItem>
                          //   </Select>
                          data.detailId
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
                          <div>
                            <Select
                              style={{ width: "200px", height: "25px" }}
                              type="text"
                              value={editedData.drcr ?? ""}
                              name="drcr"
                              onChange={(e) => {
                                const selectedValue = e.target.value;
                                setEditedData((editedData) => ({
                                  ...editedData,
                                  drcr: selectedValue,
                                }));
                              }}
                            >
                              <MenuItem value={"0"}>Debit</MenuItem>
                              <MenuItem value={"1"}>Credit</MenuItem>
                            </Select>
                          </div>
                        ) : (
                          data.drcr
                        )}
                      </TableCell>

                      <TableCell>
                        {editMode && editedRowIndex === data ? (
                          <input
                            type="text"
                            value={editedData.narration ?? ""}
                            name="narration"
                            onChange={(e) => {
                              setEditedData({
                                ...editedData,
                                narration: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          data.narration
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode && editedRowIndex === data ? (
                          <Select
                            style={{ width: "200px", height: "25px" }}
                            value={selectedAccountId}
                            name="ac"
                            onChange={handleAccountMasterChange}
                          >
                            {accountData.map((account) => (
                              <MenuItem key={account.id} value={account.id}>
                                {account.accountName}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          data.ac
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
                        value={selectedPaymentHeadId}
                        name="tranId"
                        onChange={(e) => {
                          handlePaymentHeadChange(e);
                          handleNewRecordChange(e, "tranId");
                        }}
                      >
                        {paymentHeadData.map((journal) => (
                          <MenuItem key={journal.id} value={journal.id}>
                            {journal.id}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        style={{ width: "200px", height: "25px" }}
                        value={newRecord.tranType ?? ""}
                        name="tranType"
                        onChange={(e) => handleNewRecordChange(e, "tranType")}
                      >
                        <MenuItem value="CP">Cash Payment</MenuItem>
                        <MenuItem value="CR">Cash Receipt</MenuItem>
                        <MenuItem value="BR">Bank Receipt</MenuItem>
                        <MenuItem value="BP">Bank Payment</MenuItem>
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
                      {/* <input
                        type="text"
                        value={newRecord.docDate ?? ""}
                        name="docDate"
                        onChange={(e) => handleNewRecordChange(e, "docDate")}
                      /> */}
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={newRecord.detailsId ?? ""}
                        name="detailsId"
                        onChange={(e) => handleNewRecordChange(e, "detailsId")}
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
                        value={newRecord.drcr ?? ""}
                        name="drcr"
                        onChange={(e) => {
                          handleNewRecordChange(e, "drcr");
                        }}
                      >
                        <MenuItem value={"0"}>Debit</MenuItem>
                        <MenuItem value={"1"}>Credit</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={newRecord.narration ?? ""}
                        name="narration"
                        onChange={(e) => handleNewRecordChange(e, "narration")}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        style={{ width: "200px", height: "25px" }}
                        value={selectedAccountId}
                        name="ac"
                        onChange={(e) => {
                          handleAccountMasterChange(e);
                          handleNewRecordChange(e, "ac");
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
          </Box>
        </>
      )}
    </>
  );
};

export default PaymentForm;
