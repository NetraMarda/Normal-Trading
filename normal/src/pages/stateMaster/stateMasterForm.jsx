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
  useInsertIntoStateMasterData,
  useUpdateIntoStateMasterData,
  useDeleteIntoStateMasterData,
} from "../../hooks/stateMaster/stateMaster.mutation";
import { useColors } from "../../hooks/use-colors";
import CustomIconButton from "../../components/Buttons/CustomIconButton";
import StateMasterRecords from "./stateMasterRecords";
import MenuBar from "../menu/menuBar";
import { useIds } from "../IdsContext/IdsContext";
import { Link } from "react-router-dom";

const StateMasterForm = ({ data }) => {
  const { ids } = useIds();
  const [stateMasterData, setStateMasterData] = useState({
    cityName: "",
    pinCode: "",
    subArea: "",
    state: "",
    stateCode: "",
    companyCode: "",
    createdBy: null,
    modifiedBy: null,
  });

  const [stateMasterId, setStateMasterId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [redirectToStateMasterRecords, setRedirectToStateMasterRecords] =
    useState(false);

  const handleInputData = (e) => {
    setStateMasterData({ ...stateMasterData, [e.target.name]: e.target.value });
  };

  const handleStateMasterRecordsData = () => {
    setStateMasterData(data);
    setStateMasterId(data.id);
  };

  const handleClick = () => {
    setRedirectToStateMasterRecords(true);
  };

  const handleClear = () => {
    setStateMasterId(null);
    setStateMasterData({
      cityName: "",
      pinCode: "",
      subArea: "",
      state: "",
      stateCode: "",
      companyCode: "",
      createdBy: null,
      modifiedBy: null,
    });
  };

  const insertStateMasterMutation = useInsertIntoStateMasterData();

  function handleInsertStateMasterData() {
    insertStateMasterMutation.mutate({
      ...stateMasterData,
      companyCode: ids.companyId,
      createdBy: ids.userId,
    });
    setStateMasterId(null);
    setStateMasterData({
      cityName: "",
      pinCode: "",
      subArea: "",
      state: "",
      stateCode: "",
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
  const updateStateMasterMutation = useUpdateIntoStateMasterData();

  function handleUpdateStateMasterData() {
    updateStateMasterMutation.mutate(stateMasterData);
    setStateMasterId(null);
    setStateMasterData({
      cityName: "",
      pinCode: "",
      subArea: "",
      state: "",
      stateCode: "",
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
  const deleteStateMasterMutation = useDeleteIntoStateMasterData();

  function handleDeleteStateMasterData() {
    deleteStateMasterMutation.mutate({ id: stateMasterId });
    setStateMasterId(null);
    setStateMasterData({
      cityName: "",
      pinCode: "",
      subArea: "",
      state: "",
      stateCode: "",
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
      {redirectToStateMasterRecords ? (
        <StateMasterRecords />
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
                description={"Go Back To StateMaster Records"}
              >
                <Link to="/stateMasterRecords" style={{ color: "white" }}>
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
                StateMaster Form
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
                    placeholder="Enter State Master Id"
                    label="State Id"
                    disabled
                    variant="outlined"
                    value={stateMasterId || ""}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter City Name"
                    label="City Name"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="cityName"
                    value={stateMasterData.cityName}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter Pincode"
                    label="Pincode"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="pinCode"
                    value={stateMasterData.pinCode || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter Sub Area"
                    label="Sub Area"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="subArea"
                    value={stateMasterData.subArea || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter State"
                    label="State"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="state"
                    value={stateMasterData.state || ""}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter State Code"
                    label="State Code"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="stateCode"
                    value={stateMasterData.stateCode || ""}
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
                    value={stateMasterData.companyCode || ""}
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
                    handleInsertStateMasterData();
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
                    handleStateMasterRecordsData();
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
                    handleUpdateStateMasterData();
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
                    handleDeleteStateMasterData();
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

export default StateMasterForm;
