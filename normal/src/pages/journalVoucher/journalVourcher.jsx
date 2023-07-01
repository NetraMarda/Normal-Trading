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
import { getAllJournalVourcherHeadData } from "../../api/journalVourcher/journalVourcherHead.request";
import {
  useDeleteIntoJournalVourcherHeadData,
  useInsertIntoJournalVourcherHeadData,
  useUpdateIntoJournalVourcherHeadData,
} from "../../hooks/journalVourcher/journalVourcher.mutation";
import {
  useDeleteIntoJournalVourcherDetailData,
  useInsertIntoJournalVourcherDetailData,
  useUpdateIntoJournalVourcherDetailData,
} from "../../hooks/journalVourcher/journalVourcherDetail.mutation";
import { getAllJournalVourcherDetailData } from "../../api/journalVourcher/journalVourcherDetail.request";
import JournalVourcherRecords from "./journalVourcherRecords";
import { Link } from "react-router-dom";

const JournalVourcherForm = ({ data }) => {
  const { ids, setIds } = useIds();

  const [journalData, setJournalData] = useState({
    tranType: "",
    docNo: null,
    docDate: null,
    total: 0,
    cb: 0,
    companyCode: null,
    yearCode: null,
    createdBy: null,
    modifiedBy: null,
  });
  const [journalId, setJournalId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [
    redirectToJournalVourcherRecords,
    setRedirectToJournalVourcherRecords,
  ] = useState(false);

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

  const [journalHeadData, setJournalHeadData] = useState([]);
  const [selectedJournalHeadId, setSelectedJournalHeadId] = useState("");
  const [journalHeadDocNo, setJournalHeadDocNo] = useState("");
  const [journalHeadDocDate, setJournalHeadDocDate] = useState();

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
    setJournalData({
      ...journalData,
      [e.target.name]: e.target.value,
    });
  };

  const handleJournalVourcherRecordsData = () => {
    setJournalData(data);
    setJournalId(data.id);
  };

  const handleClick = () => {
    setRedirectToJournalVourcherRecords(true);
  };

  const handleClear = () => {
    setIsDisabled(!isDisabled);
    setJournalId(null);
    setJournalData({
      tranType: "",
      docNo: null,
      docDate: null,
      total: 0,
      cb: 0,
      companyCode: null,
      yearCode: null,
      createdBy: null,
      modifiedBy: null,
    });
  };

  const [maxDocNo, setMaxDocNo] = useState();

  const fetchJournalVourcherData = async () => {
    try {
      const response = await getAllJournalVourcherHeadData();
      const journalData = response.data;
      const docNos = journalData
        .map((item) => item.docNo)
        .filter((docNo) => docNo !== null);

      const maxDoc = Math.max(...docNos) + 1;
      setMaxDocNo(maxDoc);
    } catch (error) {
      console.error("Failed to fetch Payment data:", error);
    }
  };

  useEffect(() => {
    fetchJournalVourcherData();
  }, []);

  const insertSalesMutation = useInsertIntoJournalVourcherHeadData();

  function handleInsertJournalData() {
    insertSalesMutation.mutate(
      {
        ...journalData,
        companyCode: ids.companyId,
        createdBy: ids.userId,
        yearCode: ids.accountingYearId,
        docNo: maxDocNo,
        docDate: calDate,
      },
      {
        onSuccess: () => {
          fetchJournalVourcherData();
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
    setJournalId(null);
    setJournalData({
      tranType: "",
      docNo: null,
      docDate: null,
      total: 0,
      cb: 0,
      //companyCode: null,
      // yearCode: null,
      //createdBy: null,
      //modifiedBy: null,
    });
  }
  const updateSalesMutation = useUpdateIntoJournalVourcherHeadData();

  function handleUpdateJournalData() {
    updateSalesMutation.mutate({
      ...journalData,
      companyCode: ids.companyId,
      createdBy: ids.userId,
      yearCode: ids.accountingYearId,
    });
    setJournalData({
      tranType: "",
      docNo: null,
      docDate: null,
      total: 0,
      cb: 0,
    });
    setIsDisabled(!isDisabled);
    setJournalId(null);
    setManageButton({
      create: false,
      save: true,
      delete: false,
      update: false,
      cancel: false,
      edit: false,
    });
  }
  const deleteSalesMutation = useDeleteIntoJournalVourcherHeadData();

  function handleDeleteJournalData() {
    deleteSalesMutation.mutate({ id: journalId });
    setJournalId(null);
    setJournalData({
      tranType: "",
      docNo: null,
      docDate: null,
      total: 0,
      cb: 0,
      //   companyCode: null,
      //   yearCode: null,
      //   createdBy: null,
      //   modifiedBy: null,
    });
    setIsDisabled(!isDisabled);
    setManageButton({
      create: false,
      save: true,
      delete: false,
      update: false,
      cancel: false,
      edit: false,
    });
  }

  const insertSalesDetailMutation = useInsertIntoJournalVourcherDetailData();

  function handleInsertJournalDetailData() {
    const drcrCode = newRecord.drcr === "0" ? "0" : "1";
    insertSalesDetailMutation.mutate(
      {
        ...newRecord,
        tranId: selectedJournalHeadId,
        companyCode: ids.companyId,
        createdBy: ids.userId,
        ac: selectedAccountId,
        yearCode: ids.accountingYearId,
        drcr: drcrCode,
        docNo: journalHeadDocNo,
        docDate: journalHeadDocDate,
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
  const updateSalesDetailMutation = useUpdateIntoJournalVourcherDetailData();

  function handleUpdateJournalDetailData() {
    console.log(editedData);
    updateSalesDetailMutation.mutate(
      {
        ...editedData,
        tranId: selectedJournalHeadId,
        companyCode: ids.companyId,
        createdBy: ids.userId,
        ac: selectedAccountId,
        yearCode: ids.accountingYearId,
        docNo: journalHeadDocNo,
        docDate: journalHeadDocDate,
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

  const deleteSalesDetailMutation = useDeleteIntoJournalVourcherDetailData();

  function handleDeleteJournalDetailData(id) {
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
    const fetchJournalVourcherData = async () => {
      try {
        const response = await getAllJournalVourcherDetailData();

        setPurrecordData(response.data);
      } catch (error) {
        console.error("Failed to fetch Journal Vourcher data:", error);
      }
    };
    fetchJournalVourcherData();
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
    const fetchJournalHeadData = async () => {
      try {
        const salesHeadResponse = await getAllJournalVourcherHeadData();
        setJournalHeadData(salesHeadResponse.data);

        if (salesHeadResponse.data.length > 0) {
          setSelectedJournalHeadId(salesHeadResponse.data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchJournalHeadData();
  }, []);

  // const handleJournalHeadChange = (event) => {
  //   const selectedOptionId = event.target.value;
  //   const selectedOption = journalHeadData.find(
  //     (journal) => journal.id === selectedOptionId
  //   );

  //   // console.log(selectedOption);
  //   if (selectedOption) {
  //     setSelectedJournalHeadId(selectedOption.id);
  //   }
  // };

  const handleJournalHeadChange = (event) => {
    const selectedOptionId = event.target.value;
    const selectedOption = journalHeadData.find(
      (journal) => journal.id === selectedOptionId
    );

    if (selectedOption) {
      setSelectedJournalHeadId(selectedOption.id);
      setJournalHeadDocNo(selectedOption.docNo);
      setJournalHeadDocDate(selectedOption.docDate);
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
      {redirectToJournalVourcherRecords ? (
        <JournalVourcherRecords />
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
                description={"Go Back To Journal Vourcher Records"}
              >
                <Link to="/journalVourcherRecords" style={{ color: "white" }}>
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
                Journal Vourcher Form
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
                    handleInsertJournalData();
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
                    handleJournalVourcherRecordsData();
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
                    handleUpdateJournalData();
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
                    handleDeleteJournalData();
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
                    value={journalId || ""}
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
                      value={journalData.tranType || ""}
                    >
                      <MenuItem value="JV">JV</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/* <Grid xs={12} sm={3} item>
                    <TextField
                      placeholder="Enter Document number"
                      label="Document Number"
                      disabled
                      variant="outlined"
                      //onChange={handleInputData}
                      name="docNo"
                      value={maxDocNo}
                      fullWidth
                      InputLabelProps={{ shrink: length > 0 ? true : false }}
                      //  required
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
                  <TextField
                    placeholder="Enter cb"
                    label="cb"
                    disabled
                    variant="outlined"
                    name="cb"
                    defaultValue={0}
                    InputLabelProps={{ shrink: length > 0 ? true : false }}
                    onChange={handleInputData}
                    fullWidth
                  />
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
                  handleInsertJournalDetailData();
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
                              onClick={() => handleUpdateJournalDetailData()}
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
                            handleDeleteJournalDetailData(data.id);
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
                            value={selectedJournalHeadId}
                            name="tranId"
                            onChange={(e) => {
                              handleJournalHeadChange(e);
                              setEditedData({
                                ...editedData,
                                tranId: e.target.value,
                              });
                            }}
                          >
                            {journalHeadData.map((journal) => (
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
                            <MenuItem value={"JV"}>JV</MenuItem>
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
                        ) : selectedJournalHeadId === data.tranId ? (
                          journalHeadDocNo
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
                        ) : selectedJournalHeadId === data.tranId ? (
                          journalHeadDocDate
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
                        value={selectedJournalHeadId}
                        name="tranId"
                        onChange={(e) => {
                          handleJournalHeadChange(e);
                          handleNewRecordChange(e, "tranId");
                        }}
                      >
                        {journalHeadData.map((journal) => (
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
                        <MenuItem value={"JV"}>JV</MenuItem>
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

export default JournalVourcherForm;
