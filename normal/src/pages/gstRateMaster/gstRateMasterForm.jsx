import { React, useState } from "react";
import { Grid, TextField, Button, Typography, Box } from "@mui/material";
import {
  ArrowBack,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import {
  useInsertIntoGstRateMasterData,
  useUpdateIntoGstRateMasterData,
  useDeleteIntoGstRateMasterData,
} from "../../hooks/gstRateMaster/gstRateMaster.mutation";
import { useColors } from "../../hooks/use-colors";
import CustomIconButton from "../../components/Buttons/CustomIconButton";
import GstRateMasterRecords from "./gstRateMasterRecords";
import MenuBar from "../menu/menuBar";
import { useIds } from "../IdsContext/IdsContext";
import { Link } from "react-router-dom";
import { getPurchaseDetailData } from "../../api/purchase/purchaseDetail.request";
import { getSalesDetailData } from "../../api/sales/salesDetail.request";
import { getServiceBillData } from "../../api/serviceBill/serviceBill.request";

const GstRateMasterForm = ({ data }) => {
  const { ids } = useIds();
  const [gstRateMasterData, setGstRateMasterData] = useState({
    gstName: "",
    rate: "",
    cGstRate: "",
    sGstRate: "",
    iGstRate: "",
    companyCode: "",
    createdBy: null,
    modifiedBy: null,
  });

  const [gstRateMasterId, setGstRateMasterId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [redirectToGstRateMasterRecords, setRedirectToGstRateMasterRecords] =
    useState(false);

  const handleInputData = (e) => {
    setGstRateMasterData({
      ...gstRateMasterData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGstRateMasterRecordsData = () => {
    setGstRateMasterData(data);
    setGstRateMasterId(data.id);
  };

  const handleClick = () => {
    setRedirectToGstRateMasterRecords(true);
  };

  const handleClear = () => {
    setGstRateMasterId(null);
    setGstRateMasterData({
      gstName: "",
      rate: "",
      cGstRate: "",
      sGstRate: "",
      iGstRate: "",
      companyCode: "",
      createdBy: null,
      modifiedBy: null,
    });
  };

  const insertGstRateMasterMutation = useInsertIntoGstRateMasterData();

  function handleInsertGstRateMasterData() {
    insertGstRateMasterMutation.mutate({
      ...gstRateMasterData,
      companyCode: ids.companyId,
      createdBy: ids.userId,
    });
    setGstRateMasterId(null);
    setGstRateMasterData({
      gstName: "",
      rate: "",
      cGstRate: "",
      sGstRate: "",
      iGstRate: "",
      companyCode: "",
      createdBy: null,
      modifiedBy: null,
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
  const updateGstRateMasterMutation = useUpdateIntoGstRateMasterData();

  function handleUpdateGstRateMasterData() {
    updateGstRateMasterMutation.mutate({
      ...gstRateMasterData,
      companyCode: ids.companyId,
    });
    setGstRateMasterId(null);
    setGstRateMasterData({
      gstName: "",
      rate: "",
      cGstRate: "",
      sGstRate: "",
      iGstRate: "",
      companyCode: "",
      createdBy: null,
      modifiedBy: null,
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
  const deleteGstRateMasterMutation = useDeleteIntoGstRateMasterData();

  async function checkIfUseInPurchaseDetail(gstRateMasterId) {
    try {
      const purchaseDetailData = await getPurchaseDetailData(gstRateMasterId);
      console.log("purchaseDetailData", purchaseDetailData);
      return purchaseDetailData.length > 0;
    } catch (error) {
      console.error("Failed to fetch Purchase Detail data:", error);
      return false;
    }
  }

  async function checkIfUseInSalesDetail(gstRateMasterId) {
    try {
      const salesDetailData = await getSalesDetailData(gstRateMasterId);
      console.log("salesDetailData", salesDetailData);
      return salesDetailData.length > 0;
    } catch (error) {
      console.error("Failed to fetch Sales Detail data:", error);
      return false;
    }
  }

  async function checkIfUseInServiceHead(gstRateMasterId) {
    try {
      const serviceData = await getServiceBillData(gstRateMasterId);
      console.log("serviceData", serviceData);
      return serviceData.length > 0;
    } catch (error) {
      console.error("Failed to fetch Sales Head data:", error);
      return false;
    }
  }

  function handleDeleteGstRateMasterData() {
    try{
      const isInPurchaseDetail = checkIfUseInPurchaseDetail(gstRateMasterId);
      if (isInPurchaseDetail) {
        alert(
          "Cannot delete the GstRateMaster. It is associated with PurchaseDetail."
        );
        return;
      }
    
      const isInSalesDetail = checkIfUseInSalesDetail(gstRateMasterId);
      if (isInSalesDetail) {
        alert(
          "Cannot delete the GstRateMaster. It is associated with SalesDetail."
        );
        return;
      }
    
      const isInService = checkIfUseInServiceHead(gstRateMasterId);
      if (isInService) {
        alert(
          "Cannot delete the GstRateMaster. It is associated with ServiceBill."
        );
        return;
      }
      deleteGstRateMasterMutation.mutate({ id: gstRateMasterId });
      setGstRateMasterId(null);
      setGstRateMasterData({
        gstName: "",
        rate: "",
        cGstRate: "",
        sGstRate: "",
        iGstRate: "",
        companyCode: "",
        createdBy: null,
        modifiedBy: null,
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
    }catch(error){
      console.error("Failed to delete GstRateMaster : ",error)
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

  return (
    <>
      {redirectToGstRateMasterRecords ? (
        <GstRateMasterRecords />
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
                description={"Go Back To GstRateMaster Records"}
              >
                <Link to="/gstRateMasterRecords" style={{ color: "white" }}>
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
                GstRateMaster Form
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
                    placeholder="Enter GstRate Id"
                    label="GstRate Id"
                    disabled
                    variant="outlined"
                    value={gstRateMasterId ?? ""}
                    // InputLabelProps={{ shrink: length > 0 ? true : false }}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter Gst Name"
                    label="Gst Name"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="gstName"
                    value={gstRateMasterData.gstName}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter Rate"
                    label="Rate"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="rate"
                    value={gstRateMasterData.rate || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter CGst Rate"
                    label="CGst Rate"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="cGstRate"
                    value={gstRateMasterData.cGstRate || ""}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter SGst Rate"
                    label="SGst Rate"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="sGstRate"
                    value={gstRateMasterData.sGstRate || ""}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter IGst Rate"
                    label="IGst Rate"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="iGstRate"
                    value={gstRateMasterData.iGstRate || ""}
                    fullWidth
                    required
                  />
                </Grid>
                {/* <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter Company Code"
                    label="Company Code"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="companyCode"
                    value={gstRateMasterData.companyCode || ""}
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
                    handleInsertGstRateMasterData();
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
                    handleGstRateMasterRecordsData();
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
                    handleUpdateGstRateMasterData();
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
                    handleDeleteGstRateMasterData();
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

export default GstRateMasterForm;
